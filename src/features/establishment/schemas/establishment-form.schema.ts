import { z } from 'zod'

import { EstablishmentStatus } from '../types/establishment-status.type'
import { EstablishmentWebsiteUrlFormSchema } from './establishment-website-url.schema'

export const EstablishmentFormDataSchema = z.object({
  websiteUrl: EstablishmentWebsiteUrlFormSchema,
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
        type: z.enum(['telephone', 'cellphone']),
      }),
    )
    .min(1, 'É necessário informar pelo menos um telefone'),
  timezone: z.string().trim().min(1, 'O fuso horário é obrigatório'),
})

export const CreateEstablishmentFormDataSchema = EstablishmentFormDataSchema

export const UpdateEstablishmentFormDataSchema = z.object({
  ...EstablishmentFormDataSchema.shape,
  status: z.array(
    z.enum(Object.values(EstablishmentStatus), {
      error: (issue) =>
        issue.input === undefined
          ? 'O status é obrigatório'
          : 'Status inválido',
    }),
  ),
})
