import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import NotFoundPage from '@/components/layout/not-found'
import AuthLayoutContainer from '@/features/authentication/layout/authentication-layout'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/establishment' })
    }
  },
  component: AuthLayout,
  notFoundComponent: NotFoundPage,
})

function AuthLayout() {
  return (
    <AuthLayoutContainer>
      <Outlet />
    </AuthLayoutContainer>
  )
}
