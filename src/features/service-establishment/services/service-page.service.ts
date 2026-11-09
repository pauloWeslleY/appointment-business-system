import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  ServicePageApiRequestSchema,
  ServicePageApiResponseSchema,
} from '../schemas/service-page-api.schema'
import type {
  ServicePageApiRequest,
  ServicePageApiResponse,
} from '../types/service-page-api.type'

export async function getServicePageService(
  input: ServicePageApiRequest,
  signal?: AbortSignal,
): Promise<ServicePageApiResponse> {
  const { establishmentId, ...params } =
    ServicePageApiRequestSchema.parse(input)
  const { api, validate } = httpDependencies<unknown>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/service/establishment/establishments/${establishmentId}/page`,
    params,
    signal,
  })

  return ServicePageApiResponseSchema.parse(validate.errors(response))
}
