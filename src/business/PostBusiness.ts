import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import {
  DeletePostInputDTO,
  DeletePostOutputDTO,
} from "../dtos/postDTO/deletePost.dto";
import {
  EditPostInputDTO,
  EditPostOutputDTO,
} from "../dtos/postDTO/editPost.dto";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/postDTO/getPost.dto";
import { AlreadyExistError } from "../error/AlreadyExist";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { Post, PostDB } from "../models/Post";
import { USER_ROLES, User } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getAllPosts = async (input: GetPostInputDTO): Promise<any> => {
    const { q, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
        throw new BadRequestError("somente admins podem acessar esse recurso")
    }

    const postDB = await this.postDatabase.getAllPosts(q);

    const resultPost: Post[] = postDB.map(
      (post) =>
        new Post(
          post.id,
          post.creator_id,
          post.content,
          post.likes,
          post.dislikes,
          post.created_at,
          post.updated_at
        )
    );
    const resultPostDB = resultPost.map((post) => {
      post.getId(),
        post.getContent(),
        post.getLikes(),
        post.getDislikes(),
        post.getCreatedAt(),
        post.getUpdatedAt();
    });

    const userDB = await this.userDatabase.getAllUsers();
    const resultUser: User[] = userDB.map(
      (user) =>
        new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.role,
          user.created_at
        )
    );
    const resultUserDB = resultUser.map((user) => {
      user.getId(), user.getName();
    });

    const result = {
      posts: resultPostDB,
      users: resultUserDB,
    };

    // const output: GetPostOutputDTO[] = result.map((post) => {
    //     id: post.getId(),
    //     content: post.getContent(),
    //     likes: post.getLikes(),
    //     dislikes: post.getDislikes(),
    //     created_at: post.getCreatedAt(),
    //     updated_at: post.getUpdatedAt(),
    //     creator: {
    //         id: post.getCreatorId(),
    //         name: post.getId()
    //     }
    // })
    return result;
  };

  public editPost = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { id, content } = input;
    const postDB = await this.postDatabase.findById(id);

    if (!postDB) {
      throw new NotFoundError();
    }

    const updatePost = new Post(
      postDB.id,
      postDB.creator_id,
      content || postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      new Date().toISOString()
    );

    const updatePostDB: PostDB = {
      id: updatePost.getId(),
      creator_id: updatePost.getCreatorId(),
      content: updatePost.getContent(),
      likes: updatePost.getLikes(),
      dislikes: updatePost.getDislikes(),
      created_at: updatePost.getCreatedAt(),
      updated_at: updatePost.getUpdatedAt(),
    };

    await this.postDatabase.editPost(updatePostDB);

    const output: EditPostOutputDTO = {
      message: "Post editado com sucesso",
    };

    return output;
  };

  public createPost = async (input: any): Promise<void> => {
    const { creator_id, content } = input;
    const id = this.idGenerator.generate();
    const postDB = await this.postDatabase.findById(id);

    if (postDB) {
      throw new AlreadyExistError();
    }

    const newPost = new Post(
      id,
      creator_id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newPostDB: PostDB = {
      id: newPost.getId(),
      creator_id: newPost.getCreatorId(),
      content: newPost.getContent(),
      likes: newPost.getLikes(),
      dislikes: newPost.getDislikes(),
      created_at: newPost.getCreatedAt(),
      updated_at: newPost.getUpdatedAt(),
    };
    await this.postDatabase.createPost(newPostDB);
  };

  public deletePost = async (
    input: DeletePostInputDTO
  ): Promise<DeletePostOutputDTO> => {
    const { id } = input;
    const postDB = await this.postDatabase.findById(id);
    if (!postDB) {
      throw new NotFoundError();
    }

    await this.postDatabase.deletePost(id);

    const output: DeletePostOutputDTO = {
      message: "Post deletado com sucesso",
    };
    return output;
  };
}
