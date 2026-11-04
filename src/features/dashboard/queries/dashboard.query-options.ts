import { queryOptions } from '@tanstack/react-query'

import { getStatsDashboard } from '../services/dashboard.service'
import { getRevenueDashboard } from '../services/dashboard.service'
import { getDailyAppointmentsDashboard } from '../services/dashboard.service'
import { getTopServicesDashboard } from '../services/dashboard.service'
import { getTopClientsAppointmentsDashboard } from '../services/dashboard.service'
import { getReconciliationDashboard } from '../services/dashboard.service'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'
import { validateSearchDashboardQuery } from '../utils/validate-search-dashboard-query'
import { dashboardQueryKeys } from './dashboard.query-key'

export function getStatsDashboardQueryOptions(
  params?: DashboardQueryApiRequest,
) {
  return queryOptions({
    queryKey: dashboardQueryKeys.stats(params),
    queryFn: () => getStatsDashboard(validateSearchDashboardQuery(params)),
  })
}

export function getRevenueDashboardQueryOptions(
  params?: DashboardQueryApiRequest,
) {
  return queryOptions({
    queryKey: dashboardQueryKeys.revenue(params),
    queryFn: () => getRevenueDashboard(validateSearchDashboardQuery(params)),
  })
}

export function getDailyAppointmentsDashboardQueryOptions(
  params?: DashboardQueryApiRequest,
) {
  return queryOptions({
    queryKey: dashboardQueryKeys.dailyAppointments(params),
    queryFn: () =>
      getDailyAppointmentsDashboard(validateSearchDashboardQuery(params)),
  })
}

export function getTopServicesDashboardQueryOptions(
  params?: DashboardQueryApiRequest,
) {
  return queryOptions({
    queryKey: dashboardQueryKeys.topServices(params),
    queryFn: () =>
      getTopServicesDashboard(validateSearchDashboardQuery(params)),
  })
}

export function getTopClientsAppointmentsDashboardQueryOptions(
  params?: DashboardQueryApiRequest,
) {
  return queryOptions({
    queryKey: dashboardQueryKeys.topClientsAppointments(params),
    queryFn: () =>
      getTopClientsAppointmentsDashboard(validateSearchDashboardQuery(params)),
  })
}

export function getReconciliationDashboardQueryOptions(
  params?: DashboardQueryApiRequest,
) {
  return queryOptions({
    queryKey: dashboardQueryKeys.reconciliation(params),
    queryFn: () =>
      getReconciliationDashboard(validateSearchDashboardQuery(params)),
  })
}
