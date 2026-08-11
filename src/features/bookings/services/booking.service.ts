import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { BookingModel } from '../types/booking.model'
import type { BookingStatusType } from '../types/booking-status.type'
import type { CreateBookingRequest } from '../types/create-booking-request'
import type { GetBookingByEstablishmentModel } from '../types/get-booking-by-establishment.model'
import type { GetBookingByEstablishmentQueryParams } from '../types/get-booking-by-establishment-query-params'
import type { GetListBookingByServiceQueryParams } from '../types/get-list-booking-by-service.query-params'
import type { UpdateBookingRequest } from '../types/update-booking-request'

export const getBookingByEstablishmentService = async (
  queryParams: GetBookingByEstablishmentQueryParams,
) => {
  const { api, validate } =
    httpDependencies<GetBookingByEstablishmentModel[]>()
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

export const getListBookingByServicesService = async (
  queryParams: GetListBookingByServiceQueryParams,
) => {
  const { api, validate } = httpDependencies<BookingModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/booking/service',
    params: {
      serviceId: queryParams.serviceId,
      date: queryParams.date,
    },
  })
  return validate.errors(response)
}

export const createBookingService = async (
  data: CreateBookingRequest,
) => {
  const { api, validate } = httpDependencies<BookingModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/booking',
    body: data,
  })

  return validate.errors(response)
}

export const updateBookingService = async (
  data: UpdateBookingRequest,
) => {
  const { api, validate } = httpDependencies<BookingModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/booking',
    body: data,
  })

  return validate.errors(response)
}

export const updateStatusBookingService = async (input: {
  id: string
  status: BookingStatusType
}) => {
  const { api, validate } = httpDependencies<BookingModel>()
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
