import { useQuery } from '@tanstack/react-query'

import { getReconciliationDashboardQueryOptions } from '../queries/dashboard.query-options'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { normalizeDashboardQuery } from '../utils/normalize-dashboard-query'

export function useGetReconciliationEstablishmentDashboard(
  params: DashboardQueryApiRequest,
) {
  return useQuery(
    getReconciliationDashboardQueryOptions(normalizeDashboardQuery(params)),
  )
}
