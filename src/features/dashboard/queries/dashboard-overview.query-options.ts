import { queryOptions, skipToken } from '@tanstack/react-query'

import { getDashboardOverviewService } from '../services/dashboard-overview.service'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { dashboardQueryKeys } from './dashboard.query-key'

export function dashboardOverviewQueryOptions(
  params: DashboardQueryApiRequest | undefined,
  includeRevenue: boolean,
  userId?: string,
  organizationId?: string | null,
) {
  const scopedParams =
    params && organizationId ? { ...params, organizationId } : undefined

  return queryOptions({
    queryKey: [
      ...dashboardQueryKeys.all,
      'overview',
      userId,
      organizationId,
      includeRevenue,
      scopedParams,
    ],
    queryFn:
      scopedParams && userId
        ? ({ signal }) =>
            getDashboardOverviewService(scopedParams, includeRevenue, signal)
        : skipToken,
  })
}
