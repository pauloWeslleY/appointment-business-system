import type { z } from 'zod'

import type { ServiceEstablishmentDetailsApiResponseSchema } from '../schemas/service-establishment-api-response.schema'

export type ServiceEstablishmentDetailsModel = z.infer<
  typeof ServiceEstablishmentDetailsApiResponseSchema
>
