import { z } from 'zod'

import type { SubscriptionSnapshot } from '../types/subscription.model'

const pendingSchema = z.object({
  organizationId: z.string(),
  accountId: z.string().nullable(),
  paidUntil: z.string().nullable(),
  requestId: z.uuid(),
  operationKey: z.string(),
})

export type PendingCheckout = z.infer<typeof pendingSchema>

export interface SubscriptionStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export function createSubscriptionOperationStore(
  storage: SubscriptionStorage,
  userId: string,
  organizationId: string,
  generateId: () => string,
) {
  const prefix = `subscription:${userId}:${organizationId}:`
  const pendingKey = prefix + 'pending-checkout'

  function requestId(action: string): string {
    const key = prefix + action
    const stored = storage.getItem(key)
    const valid = z.uuid().safeParse(stored)

    if (valid.success) {
      return valid.data
    }

    const id = z.uuid().parse(generateId())
    storage.setItem(key, id)
    return id
  }

  function complete(action: string): void {
    storage.removeItem(prefix + action)
  }

  function startCheckout(
    snapshot: SubscriptionSnapshot,
    requestId: string,
    operationKey: string,
  ): void {
    const pending: PendingCheckout = {
      organizationId,
      accountId: snapshot.subscription?.id ?? null,
      paidUntil: snapshot.subscription?.paidUntil ?? null,
      requestId,
      operationKey,
    }

    storage.setItem(pendingKey, JSON.stringify(pending))
  }

  function pendingCheckout(): PendingCheckout | null {
    const stored = storage.getItem(pendingKey)

    if (!stored) {
      return null
    }

    try {
      const parsed = pendingSchema.safeParse(JSON.parse(stored))
      return parsed.success && parsed.data.organizationId === organizationId
        ? parsed.data
        : null
    } catch {
      return null
    }
  }

  function clearCheckout(): void {
    storage.removeItem(pendingKey)
  }

  return {
    requestId,
    complete,
    startCheckout,
    pendingCheckout,
    clearCheckout,
  }
}

export function checkoutConfirmed(
  snapshot: SubscriptionSnapshot,
  pending: PendingCheckout | null,
): boolean {
  const paid = snapshot.subscription

  if (
    !pending ||
    !paid ||
    snapshot.access.status !== 'active' ||
    !paid.paidUntil
  ) {
    return false
  }

  return (
    paid.organizationId === pending.organizationId &&
    (paid.id !== pending.accountId || paid.paidUntil !== pending.paidUntil)
  )
}
