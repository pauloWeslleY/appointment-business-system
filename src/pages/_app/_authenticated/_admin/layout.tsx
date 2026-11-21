import { createFileRoute, Outlet } from '@tanstack/react-router'

import NotFoundPage from '@/components/layout/pages/not-found-page'
import { useMenuSidebarAuthenticated } from '@/features/authentication/hooks/use-menu-authenticated'
import SideBarAuthenticatedLayout from '@/features/authentication/layout/sidebar-authenticated-layout'

export const Route = createFileRoute('/_app/_authenticated/_admin')({
  component: AuthenticatedLayout,
  notFoundComponent: NotFoundPage,
})

function AuthenticatedLayout() {
  const { menuSidebarAuthenticated } = useMenuSidebarAuthenticated()

  return (
    <SideBarAuthenticatedLayout menu={menuSidebarAuthenticated}>
      <Outlet />
    </SideBarAuthenticatedLayout>
  )
}
