import { useQuery } from '@tanstack/react-query'

import { getRevenueDashboardQueryOptions } from '../queries/dashboard.query-options'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { normalizeDashboardQuery } from '../utils/normalize-dashboard-query'

export function useGetRevenueEstablishmentDashboard(
  params: DashboardQueryApiRequest,
) {
  return useQuery(
    getRevenueDashboardQueryOptions(normalizeDashboardQuery(params)),
  )
}
