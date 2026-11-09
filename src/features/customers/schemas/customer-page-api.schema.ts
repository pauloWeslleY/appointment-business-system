import z from 'zod'

import { CustomersApiResponseSchema } from './customer-response.api.schema'

export const CustomerPageApiResponseSchema = z.object({
  customers: CustomersApiResponseSchema,
  total: z.number().int().nonnegative(),
  summary: z.object({
    total: z.number().int().nonnegative(),
    active: z.number().int().nonnegative(),
    inactive: z.number().int().nonnegative(),
  }),
})

export const CustomerPageApiRequestSchema = z.object({
  establishmentId: z.uuid(),
  page: z.number().int().min(1).max(1_000_000),
  pageSize: z.number().int().min(1).max(100),
  q: z.string().max(200).optional(),
  gender: z.string().max(40).optional(),
  active: z.boolean().optional(),
})
