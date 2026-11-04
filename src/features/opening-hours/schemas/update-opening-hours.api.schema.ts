import z from 'zod'

import { OpeningHoursFormDataSchema } from './form-opening-hours.schema'
import { ListOpeningHoursSummaryApiResponseSchema } from './opening-hours-response.api.schema'

export const UpdateOpeningHoursApiRequestSchema = z.object({
  ...OpeningHoursFormDataSchema.shape,
  id: z.uuid({
    error: 'O ID do horário de funcionamento deve ser um UUID válido',
  }),
  establishmentId: z.uuid({
    error: 'O ID do estabelecimento deve ser um UUID válido',
  }),
})

export const UpdateOpeningHoursApiResponseSchema = z.object({
  id: z.uuid({
    error: 'O ID do horário de funcionamento deve ser um UUID válido',
  }),
  openingHours: ListOpeningHoursSummaryApiResponseSchema,
})
