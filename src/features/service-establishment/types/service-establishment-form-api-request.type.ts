import type { z } from 'zod'

import type {
  CreateServiceFormApiRequestSchema,
  UpdateServiceFormApiRequestSchema,
} from '../schemas/service-establishment-form-api-request.schema'

export type CreateServiceFormRequest = z.infer<
  typeof CreateServiceFormApiRequestSchema
>

export type UpdateServiceFormRequest = z.infer<
  typeof UpdateServiceFormApiRequestSchema
>
