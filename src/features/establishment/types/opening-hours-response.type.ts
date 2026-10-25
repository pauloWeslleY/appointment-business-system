import type z from 'zod'

import type { GetOpeningHoursResponseSchema } from '../schemas/get-opening-hours.schema'

export type GetOpeningHoursResponse = z.infer<
  typeof GetOpeningHoursResponseSchema
>
