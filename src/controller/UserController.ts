import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import { SignupSchema } from '../dtos/userDTO/signup.dto';

export class UserController {
    constructor(private userBusiness: UserBusiness) {}

    public singupUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = SignupSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            const output = await this.userBusiness.signupUser(input)

            res.status(201).send(output)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues);
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
              } else {
                res.status(500).send("Erro inesperado");
              }
        }
    }

    public loginUser = async (req: Request, res: Response): Promise<void> => {
      try {
        const input = SignupSchema.parse({
          email: req.body.email,
          password: req.body.password
          })

        const output = await this.userBusiness.loginUser(input)
        res.status(200).send(output)
      } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error.issues);
          } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message);
          } else {
            res.status(500).send("Erro inesperado");
          }
    }
    }
}