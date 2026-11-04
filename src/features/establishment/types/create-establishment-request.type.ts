import type z from 'zod'

import type { CreateEstablishmentRequestSchema } from '../schemas/create-establishment.api.schema'

export type CreateEstablishmentRequest = z.infer<
  typeof CreateEstablishmentRequestSchema
>
