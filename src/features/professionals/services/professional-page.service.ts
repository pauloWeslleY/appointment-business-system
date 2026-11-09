import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  ProfessionalPageApiRequestSchema,
  ProfessionalPageApiResponseSchema,
} from '../schemas/professional-page-api.schema'
import type {
  ProfessionalPageApiRequest,
  ProfessionalPageApiResponse,
} from '../types/professional-page-api.type'

export async function getProfessionalPageService(
  input: ProfessionalPageApiRequest,
  signal?: AbortSignal,
): Promise<ProfessionalPageApiResponse> {
  const { establishmentId, ...params } =
    ProfessionalPageApiRequestSchema.parse(input)
  const { api, validate } = httpDependencies<unknown>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/${establishmentId}/professionals`,
    params,
    signal,
  })
  return ProfessionalPageApiResponseSchema.parse(validate.errors(response))
}
