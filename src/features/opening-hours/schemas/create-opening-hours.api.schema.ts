import z from 'zod'

import { OpeningHoursFormDataSchema } from './form-opening-hours.schema'
import { ListOpeningHoursSummaryApiResponseSchema } from './opening-hours-response.api.schema'

export const CreateOpeningHoursApiRequestSchema = z.object({
  ...OpeningHoursFormDataSchema.shape,
  establishmentId: z.uuid({
    error: 'O ID do estabelecimento deve ser um UUID válido',
  }),
})

export const CreateOpeningHoursApiResponseSchema = z.object({
  id: z.uuid({ error: 'O ID do endereço deve ser um UUID válido' }),
  establishmentId: z.uuid({
    error: 'O ID do estabelecimento deve ser um UUID válido',
  }),
  openingHours: ListOpeningHoursSummaryApiResponseSchema,
})
