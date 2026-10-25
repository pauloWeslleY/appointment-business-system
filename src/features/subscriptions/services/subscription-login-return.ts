import type { SubscriptionStorage } from './subscription-operation-store.ts'

const allowedPaths = [
  '/subscription',
  '/subscription/return',
  '/subscription/canceled',
] as const

type TakeSubscriptionLoginReturn = (typeof allowedPaths)[number] | null

export function takeSubscriptionLoginReturn(
  storage: SubscriptionStorage,
): TakeSubscriptionLoginReturn {
  const stored = storage.getItem('subscription-login-return')
  const normalized = stored === '/subscription/' ? '/subscription' : stored
  const allowed = allowedPaths.find((path) => path === normalized)
  storage.removeItem('subscription-login-return')

  return allowed ?? null
}
