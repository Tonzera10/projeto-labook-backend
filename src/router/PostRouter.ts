import express from "express"
import { PostDatabase } from "../database/PostDatabase"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { IdGenerator } from "../services/IdGenerator"
import { UserDatabase } from "../database/UserDatabase"
import { TokenManager } from "../services/TokenManager"

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager()

    )
)

postRouter.get("/", postController.getAllPosts)
postRouter.post("/", postController.createPost)
postRouter.put("/:id/like",)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)