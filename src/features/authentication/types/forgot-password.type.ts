import type { z } from 'zod'

import type { ForgotPasswordSchema } from '../schemas/forgot-password.schema'

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>
