import type { z } from 'zod'

import type { ServiceEstablishmentFormSchema } from '../schemas/service-establishment-form.schema'

export type ServiceEstablishmentFormData = z.infer<
  typeof ServiceEstablishmentFormSchema
>

export type ServiceEstablishmentFormInput = z.input<
  typeof ServiceEstablishmentFormSchema
>
