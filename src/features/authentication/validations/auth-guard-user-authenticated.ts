import { redirect } from '@tanstack/react-router'

import { takeSubscriptionLoginReturn } from '@/features/subscriptions/services/subscription-login-return'
import { authClient } from '@/lib/auth'

export const authGuardUserAuthenticated = async () => {
  const { data } = await authClient.getSession()

  if (data) {
    const returnTo = takeSubscriptionLoginReturn(sessionStorage)
    throw redirect({ to: returnTo ?? '/establishment', replace: true })
  }
}
