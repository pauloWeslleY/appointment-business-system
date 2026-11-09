import { createFileRoute, Outlet } from '@tanstack/react-router'

import NotFoundPage from '@/components/layout/not-found'
import LoaderFull from '@/components/loader-full'
import { useMenuSidebarAuthenticated } from '@/features/authentication/hooks/use-menu-authenticated'
import SideBarAuthenticatedLayout from '@/features/authentication/layout/sidebar-authenticated-layout'

export const Route = createFileRoute('/_app/_authenticated/_admin')({
  pendingComponent: LoaderFull,
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
