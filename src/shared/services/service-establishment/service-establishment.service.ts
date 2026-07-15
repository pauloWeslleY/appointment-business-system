import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type {
  CreateServiceEstablishmentRequest,
  ServiceEstablishmentModel,
} from './service-establishment.dto'

export const getServiceEstablishmentByIdService = async (
  establishmentId: string,
) => {
  const { api, validate } = httpDependencies<ServiceEstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/service/establishment/${establishmentId}`,
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

export const uploadServiceEstablishmentService = async (
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
