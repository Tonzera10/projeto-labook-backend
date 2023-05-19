import express from "express"
import { PostDatabase } from "../database/PostDatabase"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"

export const postRouter = express.Router()

const postDatabase = new PostDatabase()
const postBusiness = new PostBusiness(postDatabase)
const postController = new PostController(postBusiness)

postRouter.get("/", postController.findAllPosts)
postRouter.post("/", postController.createPost)
postRouter.post("/:id/like",)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id",)