import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'

export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  stats: (params?: DashboardQueryApiRequest) =>
    [...dashboardQueryKeys.all, 'stats', params ?? null] as const,
  revenue: (params?: DashboardQueryApiRequest) =>
    [...dashboardQueryKeys.all, 'revenue', params ?? null] as const,
  dailyAppointments: (params?: DashboardQueryApiRequest) =>
    [...dashboardQueryKeys.all, 'daily-appointments', params ?? null] as const,
  topServices: (params?: DashboardQueryApiRequest) =>
    [...dashboardQueryKeys.all, 'top-services', params ?? null] as const,
  topClientsAppointments: (params?: DashboardQueryApiRequest) =>
    [
      ...dashboardQueryKeys.all,
      'top-clients-appointments',
      params ?? null,
    ] as const,
  reconciliation: (params?: DashboardQueryApiRequest) =>
    [...dashboardQueryKeys.all, 'reconciliation', params ?? null] as const,
}
