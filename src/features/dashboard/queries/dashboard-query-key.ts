import type { DashboardQueryParams } from '@/shared/types/dashboard-query-params.type'

const dashboardQueryParams = (params: Partial<DashboardQueryParams>) => ({
  establishmentId: params.establishmentId || null,
  from: params.from || null,
  to: params.to || null,
})

export const dashboardQueryKeys = {
  all: () => ['dashboard'] as const,

  dailyBookings: (params: Partial<DashboardQueryParams>) =>
    [
      ...dashboardQueryKeys.all(),
      'daily-bookings',
      dashboardQueryParams(params),
    ] as const,

  revenue: (params: Partial<DashboardQueryParams>) =>
    [
      ...dashboardQueryKeys.all(),
      'revenue',
      dashboardQueryParams(params),
    ] as const,

  stats: (params: Partial<DashboardQueryParams>) =>
    [
      ...dashboardQueryKeys.all(),
      'stats',
      dashboardQueryParams(params),
    ] as const,

  topServices: (params: Partial<DashboardQueryParams>) =>
    [
      ...dashboardQueryKeys.all(),
      'top-services',
      dashboardQueryParams(params),
    ] as const,

  topClientsBookings: (params: Partial<DashboardQueryParams>) =>
    [
      ...dashboardQueryKeys.all(),
      'top-clients-bookings',
      dashboardQueryParams(params),
    ] as const,
}
