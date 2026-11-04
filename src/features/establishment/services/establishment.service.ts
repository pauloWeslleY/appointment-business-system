import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'
import { uploadFileToR2 } from '@/shared/services/storage/upload.service'

import { CreateEstablishmentRequestSchema } from '../schemas/create-establishment.api.schema'
import {
  EstablishmentAdminSchema,
  EstablishmentDetailsSchema,
  EstablishmentListApiResponseSchema,
  EstablishmentSlugSchema,
} from '../schemas/get-establishment-api.response.schema'
import {
  GetOpeningHoursRequestSchema,
  GetOpeningHoursResponseSchema,
} from '../schemas/get-opening-hours.schema'
import { UpdateEstablishmentRequestSchema } from '../schemas/update-establishment.api.schema'
import { UploadImageEstablishmentInputSchema } from '../schemas/upload-image-establishment.schema'
import { UploadImageEstablishmentRequestSchema } from '../schemas/upload-image-establishment.schema'
import type { CreateEstablishmentRequest } from '../types/create-establishment-request.type'
import type {
  EstablishmentAdminApiResponse,
  EstablishmentDetailsApiResponse,
} from '../types/establishment-admin-api.response.type'
import type {
  EstablishmentListApiResponse,
  EstablishmentSlugApiResponse,
} from '../types/get-establishment-api.response.type'
import type { GetOpeningHoursRequest } from '../types/opening-hours-request.type'
import type { GetOpeningHoursResponse } from '../types/opening-hours-response.type'
import type { UpdateEstablishmentRequest } from '../types/update-establishment-request.type'
import type { UploadImageEstablishmentInput } from '../types/upload-image-establishment.type'
import type { UploadImageEstablishmentRequestParams } from '../types/upload-image-establishment.type'

export const getEstablishmentBySlugService = async (
  slug: string,
): Promise<EstablishmentSlugApiResponse> => {
  const validatedSlug = z.string().max(100).parse(slug)
  const { api, validate } = httpDependencies<EstablishmentSlugApiResponse>()
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

export const getEstablishmentAdminBySlugService = async (
  slug: string,
): Promise<EstablishmentSlugApiResponse> => {
  const validatedSlug = z.string().max(100).parse(slug)
  const { api, validate } = httpDependencies<EstablishmentSlugApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/by-slug/${encodeURIComponent(validatedSlug)}`,
  })
  const parsedResponse = EstablishmentSlugSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const getEstablishmentByIdService = async (
  establishmentId: string,
): Promise<EstablishmentDetailsApiResponse> => {
  const validatedId = z.uuid().parse(establishmentId)
  const { api, validate } = httpDependencies<EstablishmentDetailsApiResponse>()
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
  organizationProfileId: string,
): Promise<EstablishmentListApiResponse> => {
  const validatedOrganizationProfileId = z.uuid().parse(organizationProfileId)
  const { api, validate } = httpDependencies<EstablishmentListApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/organization-profile/${validatedOrganizationProfileId}`,
  })
  const parsedResponse = EstablishmentListApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const createEstablishmentService = async (
  data: CreateEstablishmentRequest,
): Promise<EstablishmentAdminApiResponse> => {
  const { api, validate } = httpDependencies<EstablishmentAdminApiResponse>()
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
): Promise<EstablishmentAdminApiResponse> => {
  const { id, ...changes } = UpdateEstablishmentRequestSchema.parse(data)
  const { api, validate } = httpDependencies<EstablishmentAdminApiResponse>()
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
): Promise<EstablishmentAdminApiResponse> => {
  const { establishmentId, imageUrl } =
    UploadImageEstablishmentRequestSchema.parse(data)
  const { api, validate } = httpDependencies<EstablishmentAdminApiResponse>()
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
): Promise<GetOpeningHoursResponse> => {
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

export async function uploadEstablishmentImage(
  data: UploadImageEstablishmentInput,
): Promise<EstablishmentAdminApiResponse> {
  const input = UploadImageEstablishmentInputSchema.parse(data)
  const uploaded = await uploadFileToR2({
    id: input.id,
    file: input.image,
    folder: 'establishment',
  })
  return uploadImageEstablishmentService({
    establishmentId: input.id,
    imageUrl: uploaded.key,
  })
}
