import { useQuery } from '@tanstack/react-query'

import { getDailyAppointmentsDashboardQueryOptions } from '../queries/dashboard.query-options'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { normalizeDashboardQuery } from '../utils/normalize-dashboard-query'

export function useGetDailyAppointmentsEstablishmentDashboard(
  params: DashboardQueryApiRequest,
) {
  return useQuery(
    getDailyAppointmentsDashboardQueryOptions(normalizeDashboardQuery(params)),
  )
}
