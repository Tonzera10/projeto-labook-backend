import z from "zod";

export interface DeletePostInputDTO {
  id: string;
}

export interface DeletePostOutputDTO {
  message: string;
}

export const DeletePostSchema = z.object({
  id: z.string({
    required_error: "'id' é obrigatório",
    invalid_type_error: "'id' deve ser do tipo string",
  }),
});
