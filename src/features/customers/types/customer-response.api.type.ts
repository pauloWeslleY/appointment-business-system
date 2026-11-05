import type z from 'zod'

import type {
  CustomerApiResponseSchema,
  CustomersApiResponseSchema,
} from '../schemas/customer-response.api.schema'
import type { UpdateStatusCustomerApiRequestSchema } from '../schemas/update-status-customer.api.schema'

export type CustomerApiResponse = z.infer<typeof CustomerApiResponseSchema>

export type CustomersApiResponse = z.infer<typeof CustomersApiResponseSchema>

export type UpdateStatusCustomerApiRequest = z.infer<
  typeof UpdateStatusCustomerApiRequestSchema
>
