import { useQuery } from '@tanstack/react-query'

import { getTopClientsAppointmentsDashboardQueryOptions } from '../queries/dashboard.query-options'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { normalizeDashboardQuery } from '../utils/normalize-dashboard-query'

export function useGetTopClientsAppointmentsEstablishmentDashboard(
  params: DashboardQueryApiRequest,
) {
  return useQuery(
    getTopClientsAppointmentsDashboardQueryOptions(
      normalizeDashboardQuery(params),
    ),
  )
}
