import { z } from 'zod'

import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../constants/files-config'

export const ServiceEstablishmentFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome é obrigatório'),
  description: z.string().trim().min(1, 'A descrição é obrigatória'),
  image: z
    .instanceof(FileList)
    .nullable()
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
  servicePriceInCents: z.number().min(1, 'O preço é obrigatório'),
})
