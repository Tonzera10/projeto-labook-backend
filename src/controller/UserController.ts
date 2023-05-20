import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';

export class UserController {
    constructor(private userBusiness: UserBusiness) {}

    public singupUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            await this.userBusiness.signupUser(input)

            res.status(201).send("Usuário criado com sucesso!")
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