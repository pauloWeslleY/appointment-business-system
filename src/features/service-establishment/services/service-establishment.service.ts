import { z } from 'zod'

import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'
import { uploadFileToR2 } from '@/shared/services/storage/upload.service'

import {
  CreateServiceEstablishmentApiRequestSchema,
  StatusServiceEstablishmentApiRequestSchema,
  UpdateServiceEstablishmentApiRequestSchema,
} from '../schemas/service-establishment-api-request.schema'
import {
  ServiceEstablishmentApiResponseSchema,
  ServiceEstablishmentDetailsApiResponseSchema,
  ServiceEstablishmentListItemApiResponseSchema,
} from '../schemas/service-establishment-api-response.schema'
import {
  CreateServiceFormApiRequestSchema,
  UpdateServiceFormApiRequestSchema,
} from '../schemas/service-establishment-form-api-request.schema'
import type { CreateServiceEstablishmentRequest } from '../types/create-service-establishment-request.type'
import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'
import type { ServiceEstablishmentModel } from '../types/service-establishment.model'
import type {
  StatusServiceEstablishmentRequest,
  UpdateServiceEstablishmentRequest,
} from '../types/service-establishment-api-request.type'
import type { ServiceEstablishmentDetailsModel } from '../types/service-establishment-details.model'
import type {
  CreateServiceFormRequest,
  UpdateServiceFormRequest,
} from '../types/service-establishment-form-api-request.type'

export const getServiceEstablishmentDetailService = async (
  serviceEstablishmentId: string,
): Promise<ServiceEstablishmentDetailsModel> => {
  const { api, validate } = httpDependencies<ServiceEstablishmentDetailsModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/service/establishment/details/${z.uuid().parse(serviceEstablishmentId)}`,
  })

  return ServiceEstablishmentDetailsApiResponseSchema.parse(
    validate.errors(response),
  )
}

export const getServicesByEstablishmentService = async (
  establishmentId: string,
): Promise<ListServicesEstablishmentModel[]> => {
  const { api, validate } = httpDependencies<ListServicesEstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/service/establishment/establishments/${z.uuid().parse(establishmentId)}`,
  })

  return z
    .array(ServiceEstablishmentListItemApiResponseSchema)
    .parse(validate.errors(response))
}

export const createServiceEstablishmentService = async (
  data: CreateServiceEstablishmentRequest,
): Promise<ServiceEstablishmentModel> => {
  const { api, validate } = httpDependencies<ServiceEstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/service/establishment',
    body: CreateServiceEstablishmentApiRequestSchema.parse(data),
  })

  return ServiceEstablishmentApiResponseSchema.parse(validate.errors(response))
}

export const updateServiceEstablishmentService = async (
  data: UpdateServiceEstablishmentRequest,
): Promise<ServiceEstablishmentModel> => {
  const { api, validate } = httpDependencies<ServiceEstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/admin/service/establishment',
    body: UpdateServiceEstablishmentApiRequestSchema.parse(data),
  })

  return ServiceEstablishmentApiResponseSchema.parse(validate.errors(response))
}

export const statusServiceEstablishmentService = async (
  service: StatusServiceEstablishmentRequest,
): Promise<ServiceEstablishmentModel> => {
  const { api, validate } = httpDependencies<ServiceEstablishmentModel>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/service/establishment/status`,
    body: StatusServiceEstablishmentApiRequestSchema.parse(service),
  })

  return ServiceEstablishmentApiResponseSchema.parse(validate.errors(response))
}

export const getServiceEstablishmentByIdService =
  getServiceEstablishmentDetailService
export async function createServiceEstablishmentFromForm(
  input: CreateServiceFormRequest,
): Promise<ServiceEstablishmentModel> {
  const data = CreateServiceFormApiRequestSchema.parse(input)
  const upload = data.image
    ? await uploadFileToR2({
        id: data.establishmentId,
        file: data.image,
        folder: 'services',
      })
    : undefined
  return createServiceEstablishmentService({
    ...data,
    imageUrl: upload?.publicUrl ?? null,
  })
}

export async function updateServiceEstablishmentFromForm(
  input: UpdateServiceFormRequest,
): Promise<ServiceEstablishmentModel> {
  const data = UpdateServiceFormApiRequestSchema.parse(input)
  const upload = data.image
    ? await uploadFileToR2({
        id: data.establishmentId,
        file: data.image,
        folder: 'services',
      })
    : undefined
  return updateServiceEstablishmentService({
    ...data,
    id: data.serviceEstablishmentId,
    imageUrl: upload?.publicUrl ?? data.imageUrl,
  })
}
