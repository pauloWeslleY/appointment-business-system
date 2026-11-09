import type { DashboardOverviewApiResponse } from '../types/dashboard-overview-api.type'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { useDashboardOverview } from './use-dashboard-overview'

function selectData(overview: DashboardOverviewApiResponse) {
  return overview.topClients
}

export function useGetTopClientsAppointmentsEstablishmentDashboard(
  params: DashboardQueryApiRequest,
) {
  return useDashboardOverview(params, selectData)
}
