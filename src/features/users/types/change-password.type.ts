import type { z } from 'zod'

import type { ChangePasswordFormSchema } from '../schemas/change-password-form.schema'

export type ChangePasswordForm = z.infer<typeof ChangePasswordFormSchema>
