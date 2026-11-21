import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  CreateOpeningHoursApiRequestSchema,
  CreateOpeningHoursApiResponseSchema,
} from '../schemas/create-opening-hours.api.schema'
import {
  CustomTimesOpeningHoursRequestApiSchema,
  CustomTimesOpeningHoursResponseApiSchema,
  GetCustomTimesOpeningHoursRequestApiSchema,
} from '../schemas/custom-times-opening-hours.api.schema'
import {
  DeleteOpeningHoursApiRequestSchema,
  DeleteOpeningHoursApiResponseSchema,
} from '../schemas/delete-opening-hours.api.schema'
import {
  EstablishmentOpeningHoursListApiResponseSchema,
  OpeningHoursSummaryApiResponseSchema,
} from '../schemas/opening-hours-response.api.schema'
import {
  UpdateOpeningHoursApiRequestSchema,
  UpdateOpeningHoursApiResponseSchema,
} from '../schemas/update-opening-hours.api.schema'
import type {
  CreateOpeningHoursApiRequest,
  CreateOpeningHoursApiResponse,
} from '../types/create-opening-hours.api.type'
import type {
  CustomTimesOpeningHoursRequestApi,
  CustomTimesOpeningHoursResponseApi,
  GetCustomTimesOpeningHoursRequestApi,
} from '../types/customer-times-opening-hours.api.type'
import type {
  DeleteOpeningHoursApiRequest,
  DeleteOpeningHoursApiResponse,
} from '../types/delete-opening-hours.api.type'
import type {
  EstablishmentOpeningHoursItemApiResponse,
  OpeningHoursSummaryApiResponse,
} from '../types/opening-hours-response.api.type'
import type {
  UpdateOpeningHoursApiRequest,
  UpdateOpeningHoursApiResponse,
} from '../types/update-opening-hours.api.type'

export const listOpeningHoursEstablishmentService = async (
  establishmentId: string,
): Promise<EstablishmentOpeningHoursItemApiResponse[]> => {
  const { api, validate } =
    httpDependencies<EstablishmentOpeningHoursItemApiResponse[]>()
  const establishmentIdParsed = z.uuid().parse(establishmentId)
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/opening-hours/establishment/${establishmentIdParsed}`,
  })
  const validatedResponse =
    EstablishmentOpeningHoursListApiResponseSchema.safeParse(
      validate.errors(response),
    )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const getCustomTimesOpeningHoursByIdService = async (
  params: GetCustomTimesOpeningHoursRequestApi,
): Promise<CustomTimesOpeningHoursResponseApi> => {
  const { api, validate } =
    httpDependencies<CustomTimesOpeningHoursResponseApi>()
  const data = GetCustomTimesOpeningHoursRequestApiSchema.parse(params)
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/opening-hours/establishment/${data.establishmentId}/${data.openingHoursId}/custom-times`,
  })

  const validatedResponse = CustomTimesOpeningHoursResponseApiSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const getOpeningHoursByIdService = async (
  id: string,
): Promise<OpeningHoursSummaryApiResponse> => {
  const { api, validate } = httpDependencies<OpeningHoursSummaryApiResponse>()
  const openingHoursId = z.uuid().parse(id)
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/opening-hours/${openingHoursId}`,
  })

  const validatedResponse = OpeningHoursSummaryApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const createOpeningHoursService = async (
  data: CreateOpeningHoursApiRequest,
): Promise<CreateOpeningHoursApiResponse> => {
  const { api, validate } = httpDependencies<CreateOpeningHoursApiResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/opening-hours',
    body: CreateOpeningHoursApiRequestSchema.parse(data),
  })

  const validatedResponse = CreateOpeningHoursApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const updateOpeningHoursService = async (
  data: UpdateOpeningHoursApiRequest,
): Promise<UpdateOpeningHoursApiResponse> => {
  const { api, validate } = httpDependencies<UpdateOpeningHoursApiResponse>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: '/admin/opening-hours',
    body: UpdateOpeningHoursApiRequestSchema.parse(data),
  })

  const validatedResponse = UpdateOpeningHoursApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const updateCustomTimesOpeningHoursService = async (
  data: CustomTimesOpeningHoursRequestApi,
): Promise<CustomTimesOpeningHoursResponseApi> => {
  const { api, validate } =
    httpDependencies<CustomTimesOpeningHoursResponseApi>()
  const request = CustomTimesOpeningHoursRequestApiSchema.parse(data)
  const response = await api.request({
    method: HttpMethod.PUT,
    url: `/admin/opening-hours/establishment/${request.establishmentId}/${request.openingHoursId}/custom-times`,
    body: {
      customTimes: request.customTimes,
    },
  })

  const validatedResponse = CustomTimesOpeningHoursResponseApiSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}

export const deleteOpeningHoursService = async (
  data: DeleteOpeningHoursApiRequest,
): Promise<DeleteOpeningHoursApiResponse> => {
  const { api, validate } = httpDependencies<DeleteOpeningHoursApiResponse>()
  const response = await api.request({
    method: HttpMethod.DELETE,
    url: '/admin/opening-hours',
    body: DeleteOpeningHoursApiRequestSchema.parse(data),
  })

  const validatedResponse = DeleteOpeningHoursApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return validatedResponse.data
}
