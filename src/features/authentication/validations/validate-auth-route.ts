import { redirect } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'

export const validateEnsureAuthRoute = async () => {
  const { data } = await authClient.getSession()

  if (!data?.session?.token || !data?.user?.id) {
    throw redirect({ to: '/login', replace: true })
  }

  return data
}
