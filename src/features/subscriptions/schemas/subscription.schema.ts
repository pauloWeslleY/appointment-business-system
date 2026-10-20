import { z } from 'zod'

const date = z.iso.datetime({ offset: true })
export const billingIntervalSchema = z.enum(['monthly', 'annual'])

export const subscriptionSchema = z.object({
  access: z.object({
    status: z.enum([
      'payment_required',
      'trialing',
      'trial_expired',
      'active',
      'grace',
      'cancellation_scheduled',
      'cancelled',
      'suspended',
    ]),
    canRead: z.boolean(),
    canWrite: z.boolean(),
    canCreateAppointments: z.boolean(),
    canManageSubscription: z.boolean(),
    operationalUntil: date.nullable(),
  }),
  trial: z.object({ used: z.boolean() }).nullable(),
  subscription: z
    .object({
      id: z.uuid(),
      organizationId: z.string(),
      contractorUserId: z.string(),
      billingInterval: billingIntervalSchema,
      paidUntil: date.nullable(),
      paidStartsAt: date.nullable(),
      graceStartsAt: date.nullable(),
      graceEndsAt: date.nullable(),
      cancellationRequested: z.boolean(),
      cancellationRequestedAt: date.nullable(),
      nextBillingInterval: billingIntervalSchema.nullable(),
      nextBillingIntervalEffectiveAt: date.nullable(),
      createdAt: date,
      updatedAt: date,
    })
    .nullable(),
})

export const organizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
})
export const subscriptionContextSchema = z.object({
  user: z.object({ id: z.string(), name: z.string(), email: z.string() }),
  organization: organizationSchema,
  role: z.string(),
  permissions: z.array(z.object({ resource: z.string(), action: z.string() })),
})

export const noticesSchema = z.object({
  notices: z.array(
    z.object({
      id: z.uuid(),
      kind: z.string(),
      subject: z.string(),
      text: z.string(),
      publishedAt: date,
      readAt: date.nullable(),
      obsoleteAt: date.nullable(),
    }),
  ),
})

export type SubscriptionSnapshot = z.infer<typeof subscriptionSchema>
export type SubscriptionContext = z.infer<typeof subscriptionContextSchema>
export type BillingInterval = z.infer<typeof billingIntervalSchema>
