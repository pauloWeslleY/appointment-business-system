import type z from 'zod'

import type { EstablishmentOpeningHoursFormSchema } from '../schemas/establishment-opening-hours-form.schema'

export type EstablishmentOpeningHoursForm = z.infer<
  typeof EstablishmentOpeningHoursFormSchema
>
