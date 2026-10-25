import type z from 'zod'

import type { UpdateEstablishmentRequestSchema } from '../schemas/update-establishment.schema'

export type UpdateEstablishmentRequest = z.infer<
  typeof UpdateEstablishmentRequestSchema
>
