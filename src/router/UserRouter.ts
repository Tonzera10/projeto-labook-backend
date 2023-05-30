import express from "express"
import { UserDatabase } from "../database/UserDatabase"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
      new UserDatabase(),
      new IdGenerator(),
      new TokenManager()
    )
  )

userRouter.get("/signup", userController.singupUser)