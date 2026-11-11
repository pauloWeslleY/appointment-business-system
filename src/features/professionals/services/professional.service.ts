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
  ProfessionalAvailabilityApiResponseSchema,
  ProfessionalDetailsApiResponseSchema,
  ProfessionalListApiResponseSchema,
  UpdateEmploymentApiResponseSchema,
  UpdateProfessionalApiResponseSchema,
} from '../schemas/professional-response.api.schema'
import type {
  CreateProfessionalApiRequest,
  EmploymentApiRequest,
  ProfessionalAvailabilityApiRequest,
  ProfessionalAvailabilityApiResponse,
  ProfessionalDetailsApiResponse,
  ProfessionalListApiResponse,
  UpdateEmploymentApiResponse,
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
  createProfessionalRequest: CreateProfessionalApiRequest,
): Promise<ProfessionalDetailsApiResponse> {
  const createProfessionalBody = CreateProfessionalApiRequestSchema.parse(
    createProfessionalRequest,
  )
  const { api, validate } = httpDependencies<ProfessionalDetailsApiResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/professionals',
    body: createProfessionalBody,
  })

  return parseResponse(
    ProfessionalDetailsApiResponseSchema,
    validate.errors(response),
  )
}

export async function getProfessionalService(
  professionalId: string,
): Promise<ProfessionalDetailsApiResponse> {
  const validatedProfessionalId =
    ProfessionalIdApiRequestSchema.parse(professionalId)
  const { api, validate } = httpDependencies<ProfessionalDetailsApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/professionals/${validatedProfessionalId}`,
  })

  return parseResponse(
    ProfessionalDetailsApiResponseSchema,
    validate.errors(response),
  )
}

export async function listProfessionalsService(
  establishmentId: string,
): Promise<ProfessionalListApiResponse> {
  const validatedEstablishmentId = z.uuid().parse(establishmentId)
  const { api, validate } = httpDependencies<ProfessionalListApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/admin/establishments/${validatedEstablishmentId}/professionals`,
  })

  return parseResponse(
    ProfessionalListApiResponseSchema,
    validate.errors(response),
  )
}

export async function updateProfessionalService(
  professionalId: string,
  profileUpdateRequest: UpdateProfessionalApiRequest,
): Promise<UpdateProfessionalApiResponse> {
  const validatedProfessionalId =
    ProfessionalIdApiRequestSchema.parse(professionalId)
  const profileUpdateBody =
    UpdateProfessionalApiRequestSchema.parse(profileUpdateRequest)
  const { api, validate } = httpDependencies<UpdateProfessionalApiResponse>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/professionals/${validatedProfessionalId}`,
    body: profileUpdateBody,
  })

  return parseResponse(
    UpdateProfessionalApiResponseSchema,
    validate.errors(response),
  )
}

export async function updateEmploymentService(
  employmentId: string,
  employmentUpdateRequest: EmploymentApiRequest,
): Promise<UpdateEmploymentApiResponse> {
  const validatedEmploymentId = z.uuid().parse(employmentId)
  const employmentUpdateBody = EmploymentApiRequestSchema.parse(
    employmentUpdateRequest,
  )
  const { api, validate } = httpDependencies<UpdateEmploymentApiResponse>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/employments/${validatedEmploymentId}`,
    body: employmentUpdateBody,
  })

  return parseResponse(
    UpdateEmploymentApiResponseSchema,
    validate.errors(response),
  )
}

export async function getProfessionalAvailabilityService(
  availabilityRequest: ProfessionalAvailabilityApiRequest,
): Promise<ProfessionalAvailabilityApiResponse> {
  const { professionalId, establishmentId, ...availabilityPeriod } =
    ProfessionalAvailabilityApiRequestSchema.parse(availabilityRequest)
  const { api, validate } =
    httpDependencies<ProfessionalAvailabilityApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: `/public/establishments/${establishmentId}/professionals/${professionalId}/availability`,
    params: availabilityPeriod,
  })

  return parseResponse(
    ProfessionalAvailabilityApiResponseSchema,
    validate.errors(response),
  )
}
