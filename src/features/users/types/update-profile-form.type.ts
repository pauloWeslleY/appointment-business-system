import type z from 'zod'

import type {
  UpdateProfileFormSchema,
  UploadPhotoProfileFormSchema,
} from '../schemas/update-profile-form.schema'

export type UpdateProfileFormType = z.infer<typeof UpdateProfileFormSchema>

export type UploadPhotoProfileFormDataType = z.infer<
  typeof UploadPhotoProfileFormSchema
>
