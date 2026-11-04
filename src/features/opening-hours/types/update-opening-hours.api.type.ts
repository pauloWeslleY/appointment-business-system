import type z from 'zod'

import {
  type UpdateOpeningHoursApiRequestSchema,
  type UpdateOpeningHoursApiResponseSchema,
} from '../schemas/update-opening-hours.api.schema'

export type UpdateOpeningHoursApiRequest = z.infer<
  typeof UpdateOpeningHoursApiRequestSchema
>

export type UpdateOpeningHoursApiResponse = z.infer<
  typeof UpdateOpeningHoursApiResponseSchema
>
