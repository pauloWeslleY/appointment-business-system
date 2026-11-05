import type { z } from 'zod'

import type { ServiceEstablishmentListItemApiResponseSchema } from '../schemas/service-establishment-api-response.schema'

export type ListServicesEstablishmentModel = z.infer<
  typeof ServiceEstablishmentListItemApiResponseSchema
>
