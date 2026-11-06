import { Outlet } from '@tanstack/react-router'

import PageLoader from '@/components/page-loader'
import { useRefreshMemberContext } from '@/features/members/hooks/use-refresh-member-context'

export function AuthenticatedContextLayout() {
  const hasContextChanged = useRefreshMemberContext()
  return hasContextChanged ? <PageLoader /> : <Outlet />
}
