import { redirect } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'

export const authGuardUserAuthenticated = async () => {
  const { data } = await authClient.getSession()

  if (data) {
    throw redirect({ to: '/establishment', replace: true })
  }
}
