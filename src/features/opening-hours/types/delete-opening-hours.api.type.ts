import type { z } from 'zod'

import {
  type DeleteOpeningHoursApiRequestSchema,
  type DeleteOpeningHoursApiResponseSchema,
} from '../schemas/delete-opening-hours.api.schema'

export type DeleteOpeningHoursApiRequest = z.infer<
  typeof DeleteOpeningHoursApiRequestSchema
>

export type DeleteOpeningHoursApiResponse = z.infer<
  typeof DeleteOpeningHoursApiResponseSchema
>
