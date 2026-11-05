import { z } from 'zod'

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from '@/shared/constants/files-config'

export const ServiceEstablishmentFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome é obrigatório'),
  description: z.string().trim().min(1, 'A descrição é obrigatória'),
  servicePriceInCents: z
    .number()
    .min(0, 'O preço não pode ser negativo')
    .max(21474836.47, 'Preço acima do limite permitido'),
  durationInMinutes: z
    .number({ error: 'Informe a duração do serviço' })
    .int('A duração deve ser em minutos inteiros')
    .min(1, 'A duração deve ser de pelo menos 1 minuto')
    .max(1440, 'A duração não pode ultrapassar 24 horas'),
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
})
