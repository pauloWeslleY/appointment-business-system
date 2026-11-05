import { z } from 'zod'

import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { ReviewEstablishmentApiResponseSchema } from '../schemas/reviews-api-response.schema'
import type { ReviewEstablishmentModel } from '../types/reviews-establishment.model'

export const getReviewsEstablishmentService = async (
  establishmentId: string,
): Promise<ReviewEstablishmentModel[]> => {
  const { api, validate } = httpDependencies<ReviewEstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/public/review/details/establishment/${z.uuid().parse(establishmentId)}`,
  })

  return z
    .array(ReviewEstablishmentApiResponseSchema)
    .parse(validate.errors(response))
}
