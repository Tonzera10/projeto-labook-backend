import { Post, PostDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    private TABLE_NAME = "posts";

    public findAllPosts = async (): Promise<PostDB[]> => {
        return await BaseDatabase.connection(this.TABLE_NAME)
    }

    public findById = async (id: string): Promise<PostDB | undefined> => {
        const [postDB] = await BaseDatabase.connection(this.TABLE_NAME).where({id})
        return postDB
    }

    public createPost = async (input: Post): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME).insert(({
            id: input.getId(),
            creator_id: input.getCreatorId(),
            content: input.getContent()
        }))
    }

    public editPost = async (input: Post): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
        .update({
            content: input.getContent()
        })
        .where({
            id: input.getId()
        })
    }

    public deletePost = async (id: string):Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME)
        .delete()
        .where({id})
    }
}