import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { CreateEstablishmentRequestSchema } from '../schemas/create-establishment.schema'
import {
  EstablishmentAdminSchema,
  EstablishmentDetailsSchema,
  EstablishmentOrganizationProfileSchema,
  EstablishmentSlugSchema,
} from '../schemas/get-establishment-model.schema'
import {
  GetOpeningHoursRequestSchema,
  GetOpeningHoursResponseSchema,
} from '../schemas/get-opening-hours.schema'
import { UpdateEstablishmentRequestSchema } from '../schemas/update-establishment.schema'
import { UploadImageEstablishmentRequestSchema } from '../schemas/upload-image-establishment.schema'
import type { CreateEstablishmentRequest } from '../types/create-establishment-request.type'
import type {
  EstablishmentModel,
  EstablishmentSlugModel,
} from '../types/establishment.model'
import type {
  EstablishmentAdminModel,
  EstablishmentDetailsModel,
} from '../types/establishment-admin.model'
import type { GetOpeningHoursRequest } from '../types/opening-hours-request.type'
import type { GetOpeningHoursResponse } from '../types/opening-hours-response.type'
import type { UpdateEstablishmentRequest } from '../types/update-establishment-request.type'
import type { UploadImageEstablishmentRequestParams } from '../types/upload-image-establishment.type'

export const getEstablishmentBySlugService = async (slug: string) => {
  const validatedSlug = z.string().max(100).parse(slug)
  const { api, validate } = httpDependencies<EstablishmentSlugModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/establishments/by-slug/${encodeURIComponent(validatedSlug)}`,
  })
  const parsedResponse = EstablishmentSlugSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const getEstablishmentByIdService = async (establishmentId: string) => {
  const validatedId = z.uuid().parse(establishmentId)
  const { api, validate } = httpDependencies<EstablishmentDetailsModel>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/${validatedId}`,
  })
  const parsedResponse = EstablishmentDetailsSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const getEstablishmentsByOrganizationProfileIdService = async (
  organizationProfileId?: string,
) => {
  const validatedOrganizationProfileId = z.uuid().parse(organizationProfileId)
  const { api, validate } = httpDependencies<EstablishmentModel[]>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/organization-profile/${validatedOrganizationProfileId}`,
  })
  const parsedResponse = z
    .array(EstablishmentOrganizationProfileSchema)
    .safeParse(validate.errors(response))

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const createEstablishmentService = async (
  data: CreateEstablishmentRequest,
) => {
  const { api, validate } = httpDependencies<EstablishmentAdminModel>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/establishments',
    body: CreateEstablishmentRequestSchema.parse(data),
  })
  const parsedResponse = EstablishmentAdminSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const updateEstablishmentService = async (
  data: UpdateEstablishmentRequest,
) => {
  const { id, ...changes } = UpdateEstablishmentRequestSchema.parse(data)

  const { api, validate } = httpDependencies<EstablishmentAdminModel>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/establishments/${id}`,
    body: changes,
  })
  const parsedResponse = EstablishmentAdminSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const uploadImageEstablishmentService = async (
  data: UploadImageEstablishmentRequestParams,
) => {
  const { establishmentId, imageUrl } =
    UploadImageEstablishmentRequestSchema.parse(data)
  const { api, validate } = httpDependencies<EstablishmentAdminModel>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/establishments/${establishmentId}`,
    body: {
      imageUrl,
    },
  })
  const parsedResponse = EstablishmentAdminSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const getListOpeningHoursEstablishmentService = async (
  params: GetOpeningHoursRequest,
) => {
  const { establishmentId, ...query } =
    GetOpeningHoursRequestSchema.parse(params)
  const { api, validate } = httpDependencies<GetOpeningHoursResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/establishments/${establishmentId}/availability`,
    params: query,
  })
  const parsedResponse = GetOpeningHoursResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}
