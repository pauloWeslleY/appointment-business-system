import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { CreateServiceEstablishmentRequest } from '../types/create-service-establishment-request.type'
import type { ServiceEstablishmentModel } from '../types/service-esatablishment.model'
import type { ServiceEstablishmentDetailsModel } from '../types/service-esatablishment-details.model'

export const getServiceEstablishmentByIdService = async (
  serviceEstablishmentId: string,
) => {
  const { api, validate } = httpDependencies<ServiceEstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/service/establishment/${serviceEstablishmentId}`,
  })

  return validate.errors(response)
}

export const getServiceEstablishmentDetailService = async (
  serviceEstablishmentId: string,
) => {
  const { api, validate } = httpDependencies<ServiceEstablishmentDetailsModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/service/establishment/details/${serviceEstablishmentId}`,
  })

  return validate.errors(response)
}

export const getServicesByEstablishmentService = async (
  establishmentId?: string,
) => {
  const { api, validate } = httpDependencies<ServiceEstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/service/establishment/establishments/${establishmentId}`,
  })

  return validate.errors(response)
}

export const createServiceEstablishmentService = async (
  data: CreateServiceEstablishmentRequest,
) => {
  const { api, validate } = httpDependencies<ServiceEstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/service/establishment',
    body: data,
  })

  return validate.errors(response)
}

export const updateServiceEstablishmentService = async (
  data: CreateServiceEstablishmentRequest & { id: string },
) => {
  const { api, validate } = httpDependencies<ServiceEstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/service/establishment',
    body: data,
  })

  return validate.errors(response)
}

export const deleteServiceEstablishmentService = async (
  serviceEstablishmentId: string,
) => {
  const { api, validate } = httpDependencies<ServiceEstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.DELETE,
    url: `/service/establishment/${serviceEstablishmentId}`,
  })

  return validate.errors(response)
}
