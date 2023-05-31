import { PostDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    private TABLE_NAME = "posts";

    public getAllPosts = async (q:string | undefined): Promise<any> => {

        if (!q){
            return await BaseDatabase.connection(this.TABLE_NAME)
        .innerJoin("users", "users.id", "=", "posts.creator_id")
        } else {
            return await BaseDatabase.connection(this.TABLE_NAME)
        .innerJoin("users", "users.id", "=", "posts.creator_id")
        .where(`${q}`, "=", "posts.content")
        }
        
    }

    public findById = async (id: string): Promise<PostDB | undefined> => {
        const [postDB] = await BaseDatabase.connection(this.TABLE_NAME).where({id})
        return postDB
    }

    public createPost = async (input: PostDB): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).insert(({
            id: input.id,
            creator_id: input.creator_id,
            content: input.content
        }))
    }

    public editPost = async (input: PostDB): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
        .update({
            content: input.content
        })
        .where({
            id: input.id
        })
    }

    public deletePost = async (id: string):Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
        .delete()
        .where({id})
    }
}