import type z from 'zod'

import {
  type CreateOpeningHoursApiRequestSchema,
  type CreateOpeningHoursApiResponseSchema,
} from '../schemas/create-opening-hours.api.schema'

export type CreateOpeningHoursApiRequest = z.infer<
  typeof CreateOpeningHoursApiRequestSchema
>

export type CreateOpeningHoursApiResponse = z.infer<
  typeof CreateOpeningHoursApiResponseSchema
>
