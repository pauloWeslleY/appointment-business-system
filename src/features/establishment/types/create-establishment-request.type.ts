import type z from 'zod'

import type { CreateEstablishmentRequestSchema } from '../schemas/create-establishment.schema'

export type CreateEstablishmentRequest = z.infer<
  typeof CreateEstablishmentRequestSchema
>
