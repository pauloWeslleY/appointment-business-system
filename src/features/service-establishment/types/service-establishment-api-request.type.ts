import type { z } from 'zod'

import type {
  StatusServiceEstablishmentApiRequestSchema,
  UpdateServiceEstablishmentApiRequestSchema,
} from '../schemas/service-establishment-api-request.schema'

export type UpdateServiceEstablishmentRequest = z.infer<
  typeof UpdateServiceEstablishmentApiRequestSchema
>

export type StatusServiceEstablishmentRequest = z.infer<
  typeof StatusServiceEstablishmentApiRequestSchema
>
