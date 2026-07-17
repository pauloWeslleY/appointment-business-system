import type { z } from 'zod'

import type { LoginFormSchema } from '../schemas/login-form.schema'

export type LoginFormData = z.infer<typeof LoginFormSchema>
