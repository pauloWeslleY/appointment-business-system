import z from 'zod'

export const SubscriptionStatuses = {
  PAYMENT_REQUIRED: 'payment_required',
  TRIALING: 'trialing',
  TRIAL_EXPIRED: 'trial_expired',
  ACTIVE: 'active',
  GRACE: 'grace',
  CANCELLATION_SCHEDULED: 'cancellation_scheduled',
  CANCELLED: 'cancelled',
  SUSPENDED: 'suspended',
} as const

export const SubscriptionStatusesArray = Object.values(SubscriptionStatuses)
export const SubscriptionStatusSchema = z.enum(SubscriptionStatusesArray)
export type SubscriptionStatusType =
  (typeof SubscriptionStatuses)[keyof typeof SubscriptionStatuses]
