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
import { FormaterPost, Post, PostDB } from "../models/Post";
import { USER_ROLES, User } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getAllPosts = async (input: GetPostInputDTO): Promise<GetPostOutputDTO[]> => {
    const { q } = input;

    // const payload = this.tokenManager.getPayload(token);

    // if (payload === null) {
    //   throw new BadRequestError("token inválido");
    // }

    // if (payload.role !== USER_ROLES.ADMIN) {
    //     throw new BadRequestError("somente admins podem acessar esse recurso")
    // }

    const postDB = await this.postDatabase.getAllPosts(q);

    // const resultPost: Post[] = postDB.map(
    //   (post: any) =>
    //     new Post(
    //       post.id,
    //       post.creator_id,
    //       post.content,
    //       post.likes,
    //       post.dislikes,
    //       post.created_at,
    //       post.updated_at
    //     )
    // );

    console.log(postDB)

    const output: GetPostOutputDTO[] = postDB.map((post: any) => {
      return{
        id: post.id,
        constent: post.content,
        likes: post.likes,
        dislikes: post.dislikes,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        creator: {
            id: post.creator_id,
            name: post.name,
        }
      }
        
    })

    return output;
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
