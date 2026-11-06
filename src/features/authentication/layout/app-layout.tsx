import { Outlet } from '@tanstack/react-router'

import PageLoader from '@/components/page-loader'

import { useRefreshSessionContext } from '../hooks/use-refresh-session-context'

export function AppLayout() {
  const hasSessionChanged = useRefreshSessionContext()
  return hasSessionChanged ? <PageLoader /> : <Outlet />
}
