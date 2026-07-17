import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import type { GetAppointmentByEstablishmentQueryParams } from '../types/get-appointment-by-establishment.type'

export const getAppointmentByEstablishmentService = async (
  queryParams: GetAppointmentByEstablishmentQueryParams,
) => {
  const { api, validate } =
    httpDependencies<GetAppointmentByEstablishmentModel[]>()
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
