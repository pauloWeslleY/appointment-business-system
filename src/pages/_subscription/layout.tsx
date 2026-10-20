import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'

export const Route = createFileRoute('/_subscription')({
  beforeLoad: async ({ location }) => {
    const session = await authClient.getSession({
      query: { disableCookieCache: true },
    })

    if (!session.data) {
      sessionStorage.setItem('subscription-login-return', location.pathname)
      throw redirect({ to: '/login', replace: true })
    }

    return session.data
  },
  component: Outlet,
})
