import { type z } from 'zod'

import { type EstablishmentFormSchema } from '../schemas/establishment.schema'

export type EstablishmentFormData = z.infer<typeof EstablishmentFormSchema>
