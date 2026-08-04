import type { z } from 'zod'

import type { ServiceEstablishmentFormSchema } from '../schemas/service-establishment-form.schema'
import type { StatusServiceEstablishmentSchema } from '../schemas/status-service-establishment.schema'

export type ServiceEstablishmentFormData = z.infer<
  typeof ServiceEstablishmentFormSchema
>

export type ServiceEstablishmentFormInput = z.input<
  typeof ServiceEstablishmentFormSchema
>

export type UpdateStatusServiceEstablishmentFormData = z.infer<
  typeof StatusServiceEstablishmentSchema
>
