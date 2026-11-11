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
  professionalPageRequest: ProfessionalPageApiRequest,
  signal?: AbortSignal,
): Promise<ProfessionalPageApiResponse> {
  const validatedPageRequest = ProfessionalPageApiRequestSchema.parse(
    professionalPageRequest,
  )
  const { api, validate } = httpDependencies<ProfessionalPageApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/${validatedPageRequest.establishmentId}/professionals`,
    params: {
      q: validatedPageRequest.q,
      page: validatedPageRequest.page,
      pageSize: validatedPageRequest.pageSize,
    },
    signal,
  })

  return ProfessionalPageApiResponseSchema.parse(validate.errors(response))
}
