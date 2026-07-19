import { z } from 'zod'

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from '@/shared/constants/files-config'

export const UploadImageEstablishmentSchema = z.object({
  file: z
    .instanceof(File, {
      error: 'O campo de upload de imagem é obrigatório',
    })
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
