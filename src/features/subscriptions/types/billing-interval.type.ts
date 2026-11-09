import z from 'zod'

export const BillingIntervals = {
  MONTHLY: 'monthly',
  ANNUAL: 'annual',
} as const

export const BillingIntervalsArray = Object.values(BillingIntervals)

export const BillingIntervalSchema = z.enum(BillingIntervalsArray)

export type BillingIntervalType =
  (typeof BillingIntervals)[keyof typeof BillingIntervals]

export const mapLabelBillingInterval: Record<BillingIntervalType, string> = {
  [BillingIntervals.MONTHLY]: 'Mensal',
  [BillingIntervals.ANNUAL]: 'Anual',
} as const
