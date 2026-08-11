import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import type { DashboardQueryParams } from '@/shared/types/dashboard-query-params.type'

import { dashboardQueryKeys } from '../queries/dashboard-query-key'
import { getRevenueEstablishmentService } from '../services/dashboard.services'

export function useGetRevenueEstablishmentDashboard(
  params: DashboardQueryParams,
) {
  const queryString: DashboardQueryParams = {
    establishmentId: params.establishmentId,
    from: dayjs(params.from).toISOString(),
    to: dayjs(params.to).toISOString(),
  }

  const validateQueryString = Object.values(queryString).every(
    (value) => value !== undefined,
  )

  return useQuery({
    queryKey: dashboardQueryKeys.revenue(queryString),
    queryFn: () => getRevenueEstablishmentService(queryString),
    enabled: validateQueryString,
  })
}
