import type { z } from 'zod'

import type { RegisterFormSchema } from '../schemas/register-form.schema'

export type RegisterFormData = z.infer<typeof RegisterFormSchema>
