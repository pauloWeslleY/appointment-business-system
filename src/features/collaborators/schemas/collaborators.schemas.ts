import { z } from 'zod'

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from '@/shared/constants/files-config'

const imageFile = z
  .instanceof(FileList, {
    error: 'A imagem deve ser um arquivo válido',
  })
  .nullable()

export const CollaboratorsSchema = z.object({
  name: z.string().min(1, { error: 'Nome é obrigatório' }),
  email: z
    .email({ error: 'E-mail inválido' })
    .min(1, { error: 'E-mail é obrigatório' }),
  cellphone: z
    .string()
    .min(10, { error: 'Celular deve ter no mínimo 10 dígitos' })
    .max(11, { error: 'Celular deve ter no máximo 11 dígitos' }),
  document: z.string().min(1, { error: 'Documento é obrigatório' }),
  specialty: z.string().min(1, { error: 'Especialidade é obrigatória' }),
  workSchedule: z
    .string()
    .min(1, { error: 'Horário de trabalho é obrigatório' }),
  image: z
    .preprocess((value) => value ?? null, imageFile)
    .transform((list) => list?.item(0) ?? null)
    .refine(
      (file) => !file || file.size <= MAX_IMAGE_SIZE,
      'A imagem deve possuir no máximo 5 MB',
    )
    .refine(
      (file) =>
        !file ||
        ACCEPTED_IMAGE_TYPES.includes(
          file.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
        ),
      'Utilize uma imagem JPG, PNG ou WebP',
    ),
})
