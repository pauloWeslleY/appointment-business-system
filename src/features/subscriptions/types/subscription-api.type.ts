import type { z } from 'zod'

import type { CreateMeContextRequestType } from '@/features/members/types/create-me-context-request.type'
import type { GetMeContextResponse } from '@/features/members/types/member-response.type'

import type { subscriptionAccessSchema } from '../schemas/subscription-access.schema'
import type { subscriptionAccountSchema } from '../schemas/subscription-account.schema'
import type {
  subscriptionBillingRequestSchema,
  subscriptionIntervalResponseSchema,
} from '../schemas/subscription-billing.schema'
import type { subscriptionCancellationResponseSchema } from '../schemas/subscription-cancellation.schema'
import type { subscriptionCheckoutResponseSchema } from '../schemas/subscription-checkout.schema'
import type { subscriptionOrganizationsResponseSchema } from '../schemas/subscription-context.schema'
import type { subscriptionContextQuerySchema } from '../schemas/subscription-context.schema'
import type { subscriptionErrorResponseSchema } from '../schemas/subscription-error.schema'
import type {
  subscriptionCommandHeadersSchema,
  subscriptionOrganizationHeadersSchema,
  subscriptionScopeHeadersSchema,
} from '../schemas/subscription-headers.schema'
import type {
  noticesSchema,
  subscriptionNoticeSchema,
} from '../schemas/subscription-notices.schema'
import type {
  subscriptionNoticePathSchema,
  subscriptionReadNoticeResponseSchema,
} from '../schemas/subscription-notices.schema'
import type { subscriptionPortalResponseSchema } from '../schemas/subscription-portal.schema'
import type { subscriptionTrialResponseSchema } from '../schemas/subscription-trial.schema'

export type SubscriptionAccount = z.infer<typeof subscriptionAccountSchema>
export type SubscriptionAccess = z.infer<typeof subscriptionAccessSchema>
export type SubscriptionNotice = z.infer<typeof subscriptionNoticeSchema>

export type SubscriptionContextResponse = GetMeContextResponse
export type SubscriptionSelectionRequest = CreateMeContextRequestType
export type SubscriptionContextQuery = z.infer<
  typeof subscriptionContextQuerySchema
>
export type SubscriptionOrganizationHeaders = z.infer<
  typeof subscriptionOrganizationHeadersSchema
>
export type SubscriptionScopeHeaders = z.infer<
  typeof subscriptionScopeHeadersSchema
>
export type SubscriptionCommandHeaders = z.infer<
  typeof subscriptionCommandHeadersSchema
>
export type SubscriptionBillingRequest = z.infer<
  typeof subscriptionBillingRequestSchema
>
export type SubscriptionTrialResponse = z.infer<
  typeof subscriptionTrialResponseSchema
>
export type SubscriptionCheckoutResponse = z.infer<
  typeof subscriptionCheckoutResponseSchema
>
export type SubscriptionCancellationResponse = z.infer<
  typeof subscriptionCancellationResponseSchema
>
export type SubscriptionIntervalResponse = z.infer<
  typeof subscriptionIntervalResponseSchema
>
export type SubscriptionPortalResponse = z.infer<
  typeof subscriptionPortalResponseSchema
>
export type SubscriptionErrorResponse = z.infer<
  typeof subscriptionErrorResponseSchema
>
export type SubscriptionNoticePath = z.infer<
  typeof subscriptionNoticePathSchema
>
export type SubscriptionReadNoticeResponse = z.infer<
  typeof subscriptionReadNoticeResponseSchema
>
export type SubscriptionNoticesResponse = z.infer<typeof noticesSchema>
export type SubscriptionOrganizationsResponse = z.infer<
  typeof subscriptionOrganizationsResponseSchema
>

export interface SubscriptionCommandResult {
  message: string
  redirect?: string
}
