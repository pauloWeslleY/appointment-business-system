import { createFileRoute, Outlet } from '@tanstack/react-router'

import NotFoundPage from '@/components/layout/not-found'
import SideBarAuthenticatedLayout from '@/features/authentication/layout/sidebar-authenticated-layout'
import { validateEnsureOwnerExists } from '@/features/authentication/validations/validate-owner-exists'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => validateEnsureOwnerExists(),
  component: AuthenticatedLayout,
  notFoundComponent: NotFoundPage,
})

function AuthenticatedLayout() {
  return (
    <SideBarAuthenticatedLayout>
      <Outlet />
    </SideBarAuthenticatedLayout>
  )
}
