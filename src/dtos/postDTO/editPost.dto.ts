import z from "zod";

export interface EditPostInputDTO {
  id: string;
  content: string;
}

export interface EditPostOutputDTO {
  message: string;
}

export const EditPostSchema = z.object({
  id: z.string({
    required_error: "'id' é obrigatório",
    invalid_type_error: "'id' deve ser do tipo string",
  }),
  content: z
    .string({
      required_error: "'comentário' é obrigatório",
      invalid_type_error: "'comentário' deve ser do tipo string",
    })
    .min(1)
    .max(500),
});
