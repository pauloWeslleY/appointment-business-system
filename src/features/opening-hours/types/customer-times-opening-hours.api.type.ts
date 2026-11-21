import type z from 'zod'

import {
  type CustomTimesOpeningHoursRequestApiSchema,
  type CustomTimesOpeningHoursResponseApiSchema,
  type GetCustomTimesOpeningHoursRequestApiSchema,
} from '../schemas/custom-times-opening-hours.api.schema'
import type { createCustomTimesOpeningHoursSchema } from '../schemas/custom-times-opening-hours.schema'

export type GetCustomTimesOpeningHoursRequestApi = z.infer<
  typeof GetCustomTimesOpeningHoursRequestApiSchema
>

export type CustomTimesOpeningHoursRequestApi = z.infer<
  typeof CustomTimesOpeningHoursRequestApiSchema
>

export type CustomTimesOpeningHoursResponseApi = z.infer<
  typeof CustomTimesOpeningHoursResponseApiSchema
>

export type CustomTimesOpeningHoursFormData = z.infer<
  ReturnType<typeof createCustomTimesOpeningHoursSchema>
>
