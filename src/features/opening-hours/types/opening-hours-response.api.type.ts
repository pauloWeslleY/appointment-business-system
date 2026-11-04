import type z from 'zod'

import type {
  ListOpeningHoursSummaryApiResponseSchema,
  OpeningHoursSummaryApiResponseSchema,
} from '../schemas/opening-hours-response.api.schema'

export type OpeningHoursSummaryApiResponse = z.infer<
  typeof OpeningHoursSummaryApiResponseSchema
>

export type ListOpeningHoursSummaryApiResponse = z.infer<
  typeof ListOpeningHoursSummaryApiResponseSchema
>
