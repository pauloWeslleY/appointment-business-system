import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type {
  CreateEstablishmentRequest,
  EstablishmentModel,
} from './establishment.dto'

export const getEstablishmentByIdService = async (establishmentId: string) => {
  const { api, validate } = httpDependencies<EstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/establishment/${establishmentId}`,
  })

  return validate.errors(response)
}

export const getEstablishmentsByOwnerIdService = async (ownerId?: string) => {
  const { api, validate } = httpDependencies<EstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/establishment/owner/establishments/${ownerId}`,
  })

  return validate.errors(response)
}

export const createEstablishmentService = async (
  data: CreateEstablishmentRequest,
) => {
  const { api, validate } = httpDependencies<EstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/establishment',
    body: data,
  })

  return validate.errors(response)
}

export const uploadEstablishmentService = async (
  data: CreateEstablishmentRequest & { id: string },
) => {
  const { api, validate } = httpDependencies<EstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/establishment',
    body: data,
  })

  return validate.errors(response)
}
