import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'

export const validateSearchDashboardQuery = (
  params?: DashboardQueryApiRequest,
): DashboardQueryApiRequest => {
  const hasRequiredFilters = Object.values({
    establishmentId: params?.establishmentId,
    from: params?.from,
    to: params?.to,
  }).every(Boolean)

  if (!hasRequiredFilters) {
    throw new Error('Missing required filters')
  }

  return params as DashboardQueryApiRequest
}
