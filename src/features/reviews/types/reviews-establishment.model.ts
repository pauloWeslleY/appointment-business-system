import type { z } from 'zod'

import type { ReviewEstablishmentApiResponseSchema } from '../schemas/reviews-api-response.schema'

export type ReviewEstablishmentModel = z.infer<
  typeof ReviewEstablishmentApiResponseSchema
>
