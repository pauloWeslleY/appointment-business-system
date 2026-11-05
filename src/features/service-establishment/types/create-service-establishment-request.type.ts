import type { z } from 'zod'

import type { CreateServiceEstablishmentApiRequestSchema } from '../schemas/service-establishment-api-request.schema'

export type CreateServiceEstablishmentRequest = z.infer<
  typeof CreateServiceEstablishmentApiRequestSchema
>
