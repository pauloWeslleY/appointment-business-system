import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import {
  CreateProfessionalApiRequestSchema,
  EmploymentApiRequestSchema,
  ProfessionalAvailabilityApiRequestSchema,
  ProfessionalIdApiRequestSchema,
  UpdateProfessionalApiRequestSchema,
} from '../schemas/professional-request.api.schema'
import {
  EmploymentResultApiResponseSchema,
  ProfessionalAvailabilityApiResponseSchema,
  ProfessionalDetailsApiResponseSchema,
  ProfessionalListApiResponseSchema,
  UpdateProfessionalApiResponseSchema,
} from '../schemas/professional-response.api.schema'
import type {
  CreateProfessionalApiRequest,
  EmploymentApiRequest,
  EmploymentResultApiResponse,
  ProfessionalAvailabilityApiRequest,
  ProfessionalAvailabilityApiResponse,
  ProfessionalDetailsApiResponse,
  ProfessionalListApiResponse,
  UpdateProfessionalApiRequest,
  UpdateProfessionalApiResponse,
} from '../types/professional-api.type'

function parseResponse<T>(schema: z.ZodType<T>, value: unknown): T {
  const parsed = schema.safeParse(value)
  if (!parsed.success) {
    throw new BadRequestError(z.prettifyError(parsed.error))
  }

  return parsed.data
}

export async function createProfessionalService(
  data: CreateProfessionalApiRequest,
): Promise<ProfessionalDetailsApiResponse> {
  const body = CreateProfessionalApiRequestSchema.parse(data)
  const { api, validate } = httpDependencies<ProfessionalDetailsApiResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/professionals',
    body,
  })

  return parseResponse(
    ProfessionalDetailsApiResponseSchema,
    validate.errors(response),
  )
}

export async function getProfessionalService(
  professionalId: string,
): Promise<ProfessionalDetailsApiResponse> {
  const id = ProfessionalIdApiRequestSchema.parse(professionalId)
  const { api, validate } = httpDependencies<ProfessionalDetailsApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/professionals/' + id,
  })

  return parseResponse(
    ProfessionalDetailsApiResponseSchema,
    validate.errors(response),
  )
}

export async function listProfessionalsService(
  establishmentId: string,
): Promise<ProfessionalListApiResponse> {
  const id = z.uuid().parse(establishmentId)
  const { api, validate } = httpDependencies<ProfessionalListApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/establishments/' + id + '/professionals',
  })

  return parseResponse(
    ProfessionalListApiResponseSchema,
    validate.errors(response),
  )
}

export async function updateProfessionalService(
  professionalId: string,
  data: UpdateProfessionalApiRequest,
): Promise<UpdateProfessionalApiResponse> {
  const id = ProfessionalIdApiRequestSchema.parse(professionalId)
  const body = UpdateProfessionalApiRequestSchema.parse(data)
  const { api, validate } = httpDependencies<UpdateProfessionalApiResponse>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: '/admin/professionals/' + id,
    body,
  })

  return parseResponse(
    UpdateProfessionalApiResponseSchema,
    validate.errors(response),
  )
}

export async function updateEmploymentService(
  employmentId: string,
  data: EmploymentApiRequest,
): Promise<EmploymentResultApiResponse> {
  const id = z.uuid().parse(employmentId)
  const body = EmploymentApiRequestSchema.parse(data)
  const { api, validate } = httpDependencies<EmploymentResultApiResponse>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: '/admin/employments/' + id,
    body,
  })

  return parseResponse(
    EmploymentResultApiResponseSchema,
    validate.errors(response),
  )
}

export async function getProfessionalAvailabilityService(
  data: ProfessionalAvailabilityApiRequest,
): Promise<ProfessionalAvailabilityApiResponse> {
  const { professionalId, establishmentId, ...params } =
    ProfessionalAvailabilityApiRequestSchema.parse(data)
  const { api, validate } =
    httpDependencies<ProfessionalAvailabilityApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url:
      '/public/establishments/' +
      establishmentId +
      '/professionals/' +
      professionalId +
      '/availability',
    params,
  })

  return parseResponse(
    ProfessionalAvailabilityApiResponseSchema,
    validate.errors(response),
  )
}
