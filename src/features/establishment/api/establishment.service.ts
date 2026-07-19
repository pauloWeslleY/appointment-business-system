import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/http'

import type { CreateEstablishmentRequest } from '../types/create-establishment-request.type'
import type { EstablishmentModel } from '../types/establishment.model'
import type { UploadImageEstablishmentRequestParams } from '../types/upload-image-establishment.type'

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

export const updateEstablishmentService = async (
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

export const uploadImageEstablishmentService = async (
  data: UploadImageEstablishmentRequestParams,
) => {
  const { api, validate } = httpDependencies<EstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/establishment/upload/image',
    body: {
      id: data.establishmentId,
      imageUrl: data.imageUrl,
    },
  })

  return validate.errors(response)
}

export const getListOpeningHoursEstablishmentService = async (params: {
  establishmentId: string
  serviceId: string
  selectedDate: string
}) => {
  const { api, validate } =
    httpDependencies<{ label: string; value: string }[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/establishment/opening/hours',
    params: {
      establishmentId: params.establishmentId,
      serviceId: params.serviceId,
      selectedDate: params.selectedDate,
    },
  })

  return validate.errors(response)
}
