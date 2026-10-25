import { z } from 'zod'

export const subscriptionOrganizationHeadersSchema = z.object({
  'x-organization-id': z.string().min(1).optional(),
})

export const subscriptionScopeHeadersSchema =
  subscriptionOrganizationHeadersSchema.required()

export const subscriptionCommandHeadersSchema =
  subscriptionOrganizationHeadersSchema.extend({ 'idempotency-key': z.uuid() })
