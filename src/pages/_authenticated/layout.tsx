import { createFileRoute, Outlet } from '@tanstack/react-router'

import NotFoundPage from '@/components/layout/not-found'
import SideBarAuthenticatedLayout from '@/features/authentication/layout/sidebar-authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
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
