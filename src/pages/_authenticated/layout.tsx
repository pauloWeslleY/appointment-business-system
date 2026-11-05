import { createFileRoute, Outlet } from '@tanstack/react-router'

import NotFoundPage from '@/components/layout/not-found'
import { useMenuSidebarAuthenticated } from '@/features/authentication/hooks/use-menu-authenticated'
import SideBarAuthenticatedLayout from '@/features/authentication/layout/sidebar-authenticated-layout'
import { validateAuthenticatedContext } from '@/features/authentication/validations/validate-authenticated-context'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) =>
    validateAuthenticatedContext(context.queryClient),
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
