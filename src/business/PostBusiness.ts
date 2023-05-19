import { PostDatabase } from "../database/PostDatabase";
import { AlreadyExistError } from "../error/AlreadyExist";
import { NotFoundError } from "../error/NotFoundError";
import { Post } from "../models/Post";

export class PostBusiness {
    constructor(private postDatabase: PostDatabase) {}

    public findAllPosts = async ():Promise<Post[]> => {
        const postDB = await this.postDatabase.findAllPosts()
        const result = postDB.map((post) => new Post(post.id, post.creator_id, post.content))
        return result;
    }

    public editPost = async (input: any): Promise<void> => {
        const postDB = await this.postDatabase.findById(input.id);

        if (!postDB) {
            throw new NotFoundError();
        }

        const updatePost = new Post(
            input.id,
            input.creator_id || postDB.creator_id,
            input.content || postDB.content,
        );

        await this.postDatabase.editPost(updatePost);
    }

    public createPost = async (input: any): Promise<void> => {
        const postDB = await this.postDatabase.findById(input.id);

        if(postDB){
            throw new AlreadyExistError();
        }

        const newPost = new Post(
            input.id,
            input.creator_id,
            input.content
        )
        await this.postDatabase.createPost(newPost);
    }
}