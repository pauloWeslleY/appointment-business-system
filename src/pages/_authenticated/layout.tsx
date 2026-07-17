import { createFileRoute, Outlet } from '@tanstack/react-router'

import SideBarAuthenticatedLayout from '@/features/authentication/layout/sidebar-authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <SideBarAuthenticatedLayout>
      <Outlet />
    </SideBarAuthenticatedLayout>
  )
}
