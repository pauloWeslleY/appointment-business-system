import type z from 'zod'

import type { UpdateEstablishmentRequestSchema } from '../schemas/update-establishment.api.schema'

export type UpdateEstablishmentRequest = z.infer<
  typeof UpdateEstablishmentRequestSchema
>
