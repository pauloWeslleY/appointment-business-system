import { useQuery } from '@tanstack/react-query'

import { getStatsDashboardQueryOptions } from '../queries/dashboard.query-options'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { normalizeDashboardQuery } from '../utils/normalize-dashboard-query'

export function useGetStatsEstablishmentDashboard(
  params: DashboardQueryApiRequest,
) {
  return useQuery(
    getStatsDashboardQueryOptions(normalizeDashboardQuery(params)),
  )
}
