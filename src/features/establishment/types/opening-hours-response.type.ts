import type z from 'zod'

import type { EstablishmentOpeningHoursSchema } from '../schemas/get-establishment-api.response.schema'
import type { GetOpeningHoursResponseSchema } from '../schemas/get-opening-hours.schema'

export type GetOpeningHoursResponse = z.infer<
  typeof GetOpeningHoursResponseSchema
>

export type EstablishmentOpeningHoursType = z.infer<
  typeof EstablishmentOpeningHoursSchema
>
