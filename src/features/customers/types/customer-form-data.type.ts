import type z from 'zod'

import type { CustomerFormSchema } from '../schemas/customer-form.schema'

export type CustomerFormData = z.infer<typeof CustomerFormSchema>
