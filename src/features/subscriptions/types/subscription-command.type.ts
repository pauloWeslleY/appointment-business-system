import type { BillingIntervalType } from './billing-interval.type'

export type SubscriptionAction =
  | { type: 'trial' }
  | { type: 'cancel' }
  | { type: 'portal' }
  | { type: 'checkout'; interval: BillingIntervalType }
  | { type: 'interval'; interval: BillingIntervalType }
