import type { DashboardOverviewApiResponse } from '../types/dashboard-overview-api.type'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { useDashboardOverview } from './use-dashboard-overview'

function selectData(overview: DashboardOverviewApiResponse) {
  const value = overview.revenue

  if (value === null) {
    throw new Error('Você não tem permissão para consultar o faturamento.')
  }

  return value
}

export function useGetRevenueEstablishmentDashboard(
  params: DashboardQueryApiRequest,
) {
  return useDashboardOverview(params, selectData)
}
