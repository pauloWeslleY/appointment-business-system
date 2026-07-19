import type z from 'zod'

import type { UploadImageEstablishmentSchema } from '../schemas/upload-image-establishment.schema'

export type UploadImageEstablishmentForm = z.infer<
  typeof UploadImageEstablishmentSchema
>

export interface UploadImageEstablishmentRequestParams {
  establishmentId: string
  imageUrl: string
}
