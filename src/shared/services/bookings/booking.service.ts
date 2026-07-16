import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import {
  type GetBookingByEstablishmentModel,
  type GetBookingByEstablishmentQueryParams,
} from './booking.dto'

export const getBookingByEstablishmentService = async (
  queryParams: GetBookingByEstablishmentQueryParams,
) => {
  const { api, validate } = httpDependencies<GetBookingByEstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/booking/establishment',
    params: {
      establishmentId: queryParams.establishmentId,
      from: queryParams.from,
      to: queryParams.to,
    },
  })

  return validate.errors(response)
}
