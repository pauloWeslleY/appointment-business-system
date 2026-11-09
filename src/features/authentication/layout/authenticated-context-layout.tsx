import { Outlet } from '@tanstack/react-router'
import type { ComponentType } from 'react'

import LoaderFull from '@/components/loader-full'
import { useRefreshMemberContext } from '@/features/members/hooks/use-refresh-member-context'

export function AuthenticatedContextLayout({
  loadingComponent: LoadingComponent = LoaderFull,
}: {
  loadingComponent?: ComponentType
}) {
  const hasContextChanged = useRefreshMemberContext()
  return hasContextChanged ? <LoadingComponent /> : <Outlet />
}
