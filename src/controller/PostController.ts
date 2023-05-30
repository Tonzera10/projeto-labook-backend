import { Request, Response } from 'express'
import { PostBusiness } from '../business/PostBusiness';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import {EditPostSchema} from '../dtos/postDTO/editPost.dto'
import { DeletePostSchema } from '../dtos/postDTO/deletePost.dto';
import { GetPostSchema } from '../dtos/postDTO/getPost.dto';

export class PostController {
    constructor(private postBusiness: PostBusiness) {}

    public getAllPosts = async (req: Request, res: Response):Promise<void> => {
        try {
            const input = GetPostSchema.parse({
              q: req.query.q,
              token: req.headers.authorization
            })

            const result = await this.postBusiness.getAllPosts(input)

            res.status(200).send(result);
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

    public editPost = async (req: Request, res: Response):Promise<void> => {
      try {
        const input = EditPostSchema.parse({
          id: req.params.id,
          creator_id: req.body.creator_id,
          content: req.body.content
        })

        await this.postBusiness.editPost(input)

        res.status(201).send("Post editado com sucesso");
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

    public createPost = async (req: Request, res: Response):Promise<void> => {
      try {
        const input = {
          creator_id: req.body.creator_id,
          content: req.body.content
        }

        await this.postBusiness.createPost(input)

        res.status(201).send("Post criado com sucesso");
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

    public deletePost = async (req: Request, res: Response): Promise<void> =>{
      try {
        const input = DeletePostSchema.parse({
          id: req.params.id
        })
        
        await this.postBusiness.deletePost(input)

        res.status(204).send("Post deletado com sucesso");
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