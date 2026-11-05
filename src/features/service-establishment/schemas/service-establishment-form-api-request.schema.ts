import { z } from 'zod'

import { CreateServiceEstablishmentApiRequestSchema } from './service-establishment-api-request.schema'

export const CreateServiceFormApiRequestSchema =
  CreateServiceEstablishmentApiRequestSchema.omit({ imageUrl: true }).extend({
    image: z.instanceof(File).nullable(),
  })
export const UpdateServiceFormApiRequestSchema =
  CreateServiceFormApiRequestSchema.extend({
    serviceEstablishmentId: z.uuid(),
    imageUrl: z.url().nullable(),
  })
