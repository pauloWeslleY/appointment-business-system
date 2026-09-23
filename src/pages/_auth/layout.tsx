import { createFileRoute, Outlet } from '@tanstack/react-router'

import NotFoundPage from '@/components/layout/not-found'
import AuthLayoutContainer from '@/features/authentication/layout/authentication-layout'
import { authGuardUserAuthenticated } from '@/features/authentication/validations/auth-guard-user-authenticated'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => authGuardUserAuthenticated(),
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
