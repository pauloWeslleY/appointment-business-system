import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { DashboardOverviewApiResponseSchema } from '../schemas/dashboard-overview-api.schema'
import { DashboardQueryApiRequestSchema } from '../schemas/dashboard-query.api.schema'
import type { DashboardOverviewApiResponse } from '../types/dashboard-overview-api.type'
import type { DashboardQueryApiRequest } from '../types/dashboard-query.api.type'

export async function getDashboardOverviewService(
  input: DashboardQueryApiRequest,
  includeRevenue: boolean,
  signal?: AbortSignal,
): Promise<DashboardOverviewApiResponse> {
  const params = DashboardQueryApiRequestSchema.parse(input)
  const { api, validate } = httpDependencies<unknown>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/dashboard/establishment/overview',
    params: { ...params, includeRevenue: String(includeRevenue) },
    signal,
  })

  return DashboardOverviewApiResponseSchema.parse(validate.errors(response))
}
