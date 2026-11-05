import type z from 'zod'

import type { CreateCustomerApiRequestSchema } from '../schemas/customer-request.api.schema'

export type CreateCustomerApiRequest = z.infer<
  typeof CreateCustomerApiRequestSchema
>
