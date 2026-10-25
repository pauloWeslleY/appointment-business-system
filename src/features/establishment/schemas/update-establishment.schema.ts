import z from 'zod'

import { EstablishmentStatusSchema } from '../types/establishment-status.type'
import { CreateEstablishmentRequestSchema } from './create-establishment.schema'

export const UpdateEstablishmentRequestSchema =
  CreateEstablishmentRequestSchema.partial().extend({
    id: z.uuid(),
    status: EstablishmentStatusSchema.optional(),
  })
