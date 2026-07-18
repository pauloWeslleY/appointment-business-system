import type z from 'zod'

import type { UpdateProfileFormSchema } from '../schemas/update-profile-form.schema'

export type UpdateProfileFormType = z.infer<typeof UpdateProfileFormSchema>
