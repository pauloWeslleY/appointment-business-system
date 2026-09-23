import { redirect } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'

export const authGuardUserAuthenticated = async () => {
  const { data } = await authClient.getSession()

  if (data?.session?.token || !data?.user?.id) {
    throw redirect({
      to: '/establishment',
      replace: true,
    })
  }
}
