import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { ReviewEstablishmentModel } from '../types/reviews-establishment.model'

export const getReviewsEstablishmentService = async (
  establishmentId?: string,
) => {
  const { api, validate } = httpDependencies<ReviewEstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/rating/details/establishment/${establishmentId}`,
  })

  return validate.errors(response)
}
