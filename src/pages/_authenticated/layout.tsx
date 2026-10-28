import { createFileRoute, Outlet } from '@tanstack/react-router'

import NotFoundPage from '@/components/layout/not-found'
import SideBarAuthenticatedLayout from '@/features/authentication/layout/sidebar-authenticated-layout'
import { validateAuthenticatedContext } from '@/features/authentication/validations/validade-authenticated-context'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) =>
    await validateAuthenticatedContext(context.queryClient),
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
