import { type z } from 'zod'

import type { CreateOwnerFormSchema } from '../schemas/create-owner-form.schema'
import type { UpdateOwnerFormSchema } from '../schemas/update-owner-form.schema'

export type CreateOwnerFormData = z.infer<typeof CreateOwnerFormSchema>
export type UpdateOwnerFormData = z.infer<typeof UpdateOwnerFormSchema>
