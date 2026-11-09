import { useQuery } from '@tanstack/react-query'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useMemberContext } from '@/features/members/hooks/use-member-context'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'

import { dashboardOverviewQueryOptions } from '../queries/dashboard-overview.query-options'
import type { DashboardOverviewApiResponse } from '../types/dashboard-overview-api.type'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { normalizeDashboardQuery } from '../utils/normalize-dashboard-query'

export function useDashboardOverview<T>(
  params: DashboardQueryApiRequest,
  select: (overview: DashboardOverviewApiResponse) => T,
) {
  const { data: session } = useAppSession()
  const memberContext = useMemberContext()
  const includeRevenue =
    memberContext?.permissions.some(
      (permission) =>
        permission.resource === RESOURCES.DASHBOARD_REVENUE &&
        permission.action === PERMISSION_ACTIONS.READ,
    ) ?? false

  return useQuery({
    ...dashboardOverviewQueryOptions(
      normalizeDashboardQuery(params),
      includeRevenue,
      session?.user.id,
      session?.session.activeOrganizationId,
    ),
    select,
  })
}
