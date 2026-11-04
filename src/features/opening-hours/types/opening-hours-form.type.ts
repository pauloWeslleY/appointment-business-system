import type { z } from 'zod'

import type { OpeningHoursFormDataSchema } from '../schemas/form-opening-hours.schema'

export type OpeningHoursFormData = z.infer<typeof OpeningHoursFormDataSchema>
