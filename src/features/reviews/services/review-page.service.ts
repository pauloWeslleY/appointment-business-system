import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  ReviewPageApiRequestSchema,
  ReviewPageApiResponseSchema,
} from '../schemas/review-page-api.schema'
import type {
  ReviewPageApiRequest,
  ReviewPageApiResponse,
} from '../types/review-page-api.type'

export async function getReviewPageService(
  input: ReviewPageApiRequest,
  signal?: AbortSignal,
): Promise<ReviewPageApiResponse> {
  const { establishmentId, ...params } = ReviewPageApiRequestSchema.parse(input)
  const { api, validate } = httpDependencies<ReviewPageApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/public/review/details/establishment/${establishmentId}`,
    params,
    signal,
  })
  return ReviewPageApiResponseSchema.parse(validate.errors(response))
}
