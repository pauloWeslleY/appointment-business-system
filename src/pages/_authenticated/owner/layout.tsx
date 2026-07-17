import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import OwnerLayoutContainer from '@/features/owner/layout/owner-layout'
import { authClient } from '@/lib/auth'

export const Route = createFileRoute('/_authenticated/owner')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session?.user) {
      throw redirect({
        to: '/login',
        hash: 'owner',
        search: `redirectTo=${encodeURIComponent(
          window.location.pathname + window.location.search,
        )}`,
      })
    }
  },
  component: OwnerLayout,
})

function OwnerLayout() {
  return (
    <OwnerLayoutContainer>
      <Outlet />
    </OwnerLayoutContainer>
  )
}
