import type z from 'zod'

import type {
  EstablishmentOpeningHoursItemApiResponseSchema,
  ListOpeningHoursSummaryApiResponseSchema,
  OpeningHoursSummaryApiResponseSchema,
} from '../schemas/opening-hours-response.api.schema'

export type EstablishmentOpeningHoursItemApiResponse = z.infer<
  typeof EstablishmentOpeningHoursItemApiResponseSchema
>

export type OpeningHoursSummaryApiResponse = z.infer<
  typeof OpeningHoursSummaryApiResponseSchema
>

export type ListOpeningHoursSummaryApiResponse = z.infer<
  typeof ListOpeningHoursSummaryApiResponseSchema
>
