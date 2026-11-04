import dayjs from 'dayjs'

import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'

export function normalizeDashboardQuery(
  params: DashboardQueryApiRequest,
): DashboardQueryApiRequest | undefined {
  const from = dayjs(params.from)
  const to = dayjs(params.to)
  const hasRequiredFilters = Boolean(
    params.establishmentId && params.from && params.to,
  )

  if (!hasRequiredFilters || !from.isValid() || !to.isValid()) {
    return undefined
  }

  return {
    ...params,
    from: from.toISOString(),
    to: to.toISOString(),
  }
}
