import express from "express"
import { UserDatabase } from "../database/UserDatabase"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"

export const userRouter = express.Router()

const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(userDatabase)
const userController = new UserController(userBusiness)

userRouter.get("/signup", userController.singupUser)