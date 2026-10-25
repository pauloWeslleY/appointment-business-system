import type z from 'zod'

import type { GetOpeningHoursRequestSchema } from '../schemas/get-opening-hours.schema'

export type GetOpeningHoursRequest = z.infer<
  typeof GetOpeningHoursRequestSchema
>
