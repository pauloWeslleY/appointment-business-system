import { z } from 'zod'

import { EstablishmentStatusSchema } from '../types/establishment-status.type'
import { EstablishmentFormDataSchema } from './establishment-form.schema'
import { EstablishmentWebsiteUrlSchema } from './establishment-website-url.schema'

export const UpdateEstablishmentRequestSchema =
  EstablishmentFormDataSchema.omit({ phones: true })
    .partial()
    .extend({
      websiteUrl: EstablishmentWebsiteUrlSchema.nullable().optional(),
      id: z.uuid(),
      status: EstablishmentStatusSchema.optional(),
      phones: z
        .array(z.string())
        .min(1, 'É necessário informar pelo menos um telefone')
        .optional(),
    })
