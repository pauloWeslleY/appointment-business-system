import z from 'zod'

import { ListOpeningHoursSummaryApiResponseSchema } from './opening-hours-response.api.schema'

export const DeleteOpeningHoursApiRequestSchema = z.object({
  id: z.uuid({
    error: 'O ID do horário de funcionamento deve ser um UUID válido',
  }),
  establishmentId: z.uuid({
    error: 'O ID do estabelecimento deve ser um UUID válido',
  }),
})

export const DeleteOpeningHoursApiResponseSchema = z.object({
  id: z.uuid({
    error: 'O ID do horário de funcionamento deve ser um UUID válido',
  }),
  openingHours: ListOpeningHoursSummaryApiResponseSchema,
})
