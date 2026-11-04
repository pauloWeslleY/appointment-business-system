import type z from 'zod'

import type {
  CreateEstablishmentFormDataSchema,
  EstablishmentFormDataSchema,
  UpdateEstablishmentFormDataSchema,
} from '../schemas/establishment-form.schema'

export type CreateEstablishmentFormData = z.infer<
  typeof CreateEstablishmentFormDataSchema
>

export type UpdateEstablishmentFormData = z.infer<
  typeof UpdateEstablishmentFormDataSchema
>

export type FormTelephoneEstablishmentType = Pick<
  z.infer<typeof EstablishmentFormDataSchema>,
  'phones'
>
