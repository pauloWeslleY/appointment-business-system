import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import type { CreateEstablishmentRequest } from '../types/create-establishment-request.type'
import type {
  EstablishmentModel,
  EstablishmentSlugModel,
} from '../types/establishment.model'
import type { EstablishmentAdminModel } from '../types/establishment-admin.model'
import type { UpdateEstablishmentRequest } from '../types/update-establishment-request.type'
import type { UploadImageEstablishmentRequestParams } from '../types/upload-image-establishment.type'

export const getEstablishmentBySlugService = async (slug: string) => {
  const { api, validate } = httpDependencies<EstablishmentSlugModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/establishment/info/details/slug/${slug}`,
  })

  return validate.errors(response)
}

export const getEstablishmentByIdService = async (establishmentId: string) => {
  const { api, validate } = httpDependencies<EstablishmentAdminModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/${establishmentId}`,
  })

  return validate.errors(response)
}

export const getEstablishmentsByOwnerIdService = async (ownerId?: string) => {
  const { api, validate } = httpDependencies<EstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/owner/${ownerId}`,
  })

  return validate.errors(response)
}

export const createEstablishmentService = async (
  data: CreateEstablishmentRequest,
) => {
  const { api, validate } = httpDependencies<EstablishmentAdminModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/establishments',
    body: data,
  })

  return validate.errors(response)
}

export const updateEstablishmentService = async (
  data: UpdateEstablishmentRequest,
) => {
  const { id, ...changes } = data

  const { api, validate } = httpDependencies<EstablishmentAdminModel>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/establishments/${id}`,
    body: changes,
  })

  return validate.errors(response)
}

export const uploadImageEstablishmentService = async (
  data: UploadImageEstablishmentRequestParams,
) => {
  const { api, validate } = httpDependencies<EstablishmentAdminModel>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/establishments/${data.establishmentId}`,
    body: {
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
