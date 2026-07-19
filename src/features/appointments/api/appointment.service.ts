import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { AppointmentModel } from '../types/appointment.model'
import type { AppointmentStatusType } from '../types/appointment-status.type'
import type { CreateAppointmentRequest } from '../types/create-appointment-request'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import type { GetAppointmentByEstablishmentQueryParams } from '../types/get-appointment-by-establishment-query-params'
import type { GetListBookingByServiceQueryParams } from '../types/get-list-booking-by-service.query-params'
import type { UpdateAppointmentRequest } from '../types/update-appointment-request'

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

export const getListAppointmentByServicesService = async (
  queryParams: GetListBookingByServiceQueryParams,
) => {
  const { api, validate } = httpDependencies<AppointmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/booking/services',
    params: {
      serviceId: queryParams.serviceId,
      date: queryParams.date,
    },
  })
  return validate.errors(response)
}

export const createAppointmentService = async (
  data: CreateAppointmentRequest,
) => {
  const { api, validate } = httpDependencies<AppointmentModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/booking',
    body: data,
  })

  return validate.errors(response)
}

export const updateAppointmentService = async (
  data: UpdateAppointmentRequest,
) => {
  const { api, validate } = httpDependencies<AppointmentModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/booking',
    body: data,
  })

  return validate.errors(response)
}

export const updateStatusAppointmentService = async (input: {
  id: string
  status: AppointmentStatusType
}) => {
  const { api, validate } = httpDependencies<AppointmentModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/booking/status',
    body: {
      id: input.id,
      status: input.status,
    },
  })

  return validate.errors(response)
}
