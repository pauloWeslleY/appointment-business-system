import z from 'zod'

export const BillingIntervals = {
  MONTHLY: 'monthly',
  ANNUAL: 'annual',
} as const

export const BillingIntervalsArray = Object.values(BillingIntervals)
export const BillingIntervalSchema = z.enum(BillingIntervalsArray)
export type BillingIntervalType =
  (typeof BillingIntervals)[keyof typeof BillingIntervals]
