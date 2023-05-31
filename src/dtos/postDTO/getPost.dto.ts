import z from 'zod'

export interface GetPostInputDTO {
    q: string,
    // token: string
}

export interface GetPostOutputDTO {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export const GetPostSchema = z.object({
    q: z.string({
        invalid_type_error: "'q' deve ser do tipo string"
    }).optional(),
    // token: z.string({
    //     required_error: "'token' é obrigatório",
    //     invalid_type_error: "'token' deve ser do tipo string"
    // }).min(1, "'token' deve possuir no mínimo 1 caractere")
}).transform(data => data as GetPostInputDTO)