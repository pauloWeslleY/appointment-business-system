import type { z } from 'zod'

import type { ServiceEstablishmentApiResponseSchema } from '../schemas/service-establishment-api-response.schema'

export type ServiceEstablishmentModel = z.infer<
  typeof ServiceEstablishmentApiResponseSchema
>
