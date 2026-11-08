import { z } from 'zod'

import { InputPasswordSchema } from './password.schema'

export const ResetPasswordSchema = z.object({
  newPassword: InputPasswordSchema,
})
