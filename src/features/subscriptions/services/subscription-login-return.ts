import type { SubscriptionStorage } from './subscription-operation-store.ts'

const allowedPaths = [
  '/assinatura',
  '/assinatura/retorno',
  '/assinatura/cancelado',
] as const

export function takeSubscriptionLoginReturn(
  storage: SubscriptionStorage,
): (typeof allowedPaths)[number] | null {
  const stored = storage.getItem('subscription-login-return')
  const normalized = stored === '/assinatura/' ? '/assinatura' : stored
  const allowed = allowedPaths.find((path) => path === normalized)
  storage.removeItem('subscription-login-return')

  return allowed ?? null
}
