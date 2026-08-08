import { createFileRoute, Outlet } from '@tanstack/react-router'

import NotFoundPage from '@/components/layout/not-found'
import AuthLayoutContainer from '@/features/authentication/layout/authentication-layout'

export const Route = createFileRoute('/_auth')({
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
