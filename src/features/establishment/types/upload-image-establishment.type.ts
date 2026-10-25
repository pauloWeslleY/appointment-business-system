import type z from 'zod'

import type {
  UploadImageEstablishmentRequestSchema,
  UploadImageEstablishmentSchema,
} from '../schemas/upload-image-establishment.schema'

export type UploadImageEstablishmentForm = z.infer<
  typeof UploadImageEstablishmentSchema
>

export type UploadImageEstablishmentRequestParams = z.infer<
  typeof UploadImageEstablishmentRequestSchema
>
