import type z from 'zod'

import type { CustomerSchema } from '../schemas/customer.schema'
import type { UpdateStatusCustomerSchema } from '../schemas/update-status-customer.schema'

export type CustomerFormData = z.infer<typeof CustomerSchema>

export type UpdateStatusCustomerFormData = z.infer<
  typeof UpdateStatusCustomerSchema
>
