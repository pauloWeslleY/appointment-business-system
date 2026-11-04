import { useQuery } from '@tanstack/react-query'

import { getTopServicesDashboardQueryOptions } from '../queries/dashboard.query-options'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { normalizeDashboardQuery } from '../utils/normalize-dashboard-query'

export function useGetTopServicesEstablishmentDashboard(
  params: DashboardQueryApiRequest,
) {
  return useQuery(
    getTopServicesDashboardQueryOptions(normalizeDashboardQuery(params)),
  )
}
