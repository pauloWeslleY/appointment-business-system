import type { z } from 'zod'

import type { ChangePasswordApiRequestSchema } from '../schemas/change-password-api.schema'
import type { ChangePasswordFormSchema } from '../schemas/change-password-form.schema'

export type ChangePasswordApiRequest = z.infer<
  typeof ChangePasswordApiRequestSchema
>
export type ChangePasswordForm = z.infer<typeof ChangePasswordFormSchema>
