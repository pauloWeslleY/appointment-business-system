import type z from 'zod'

import type { UpdateCustomerApiRequestSchema } from '../schemas/customer-request.api.schema'

export type UpdateCustomerApiRequest = z.infer<
  typeof UpdateCustomerApiRequestSchema
>
