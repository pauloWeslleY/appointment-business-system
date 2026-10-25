import { z } from 'zod'

export const CreateEstablishmentFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome do estabelecimento é obrigatório'),
  description: z
    .string()
    .trim()
    .min(1, 'A descrição do estabelecimento é obrigatória'),
  email: z.email({
    error: (issue) =>
      issue.input === undefined ? 'O email é obrigatório' : 'Email inválido',
  }),
  phones: z
    .array(
      z.object({
        phone: z.string().min(1, 'O telefone é obrigatório'),
      }),
    )
    .min(1, 'É necessário informar pelo menos um telefone'),
  timezone: z.string().trim().min(1, 'O fuso horário é obrigatório'),
})
