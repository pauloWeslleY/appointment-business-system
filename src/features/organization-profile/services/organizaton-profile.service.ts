import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'
import { headerIdempontecyKey } from '@/shared/utils/idempontecy-key'

import { CreateOrganizationProfileApiResponse } from '../schemas/create-organization-profile.schema'
import { GetOrganizationProfileModel } from '../schemas/get-organization-profile.schema'
import {
  type CreateProfileOrganizationRequest,
  type CreateProfileOrganizationResponse,
} from '../types/create-organization-profile.api'
import type { GetOrganizationProfileResponse } from '../types/get-organization-profile.model'
import type { UpdateProfileOrganizationRequest } from '../types/update-organization-profile.api'

export const createOrganizationProfileService = async (
  data: CreateProfileOrganizationRequest,
) => {
  const { api, validate } =
    httpDependencies<CreateProfileOrganizationResponse>()
  const response = await api.request({
    url: '/admin/organizations',
    method: HttpMethod.POST,
    headers: { ...headerIdempontecyKey(data.idempotencyKey) },
    body: {
      name: data.name,
      slug: data.slug,
      profile: {
        legalName: data.profile.legalName,
        tradeName: data.profile.tradeName,
        email: data.profile.email,
        phone: data.profile.phone,
      },
    },
  })

  const responseBody = validate.errors(response)
  const validatedResponse =
    CreateOrganizationProfileApiResponse.safeParse(responseBody)

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return responseBody
}

export const updateOrganizationProfileService = async (
  data: UpdateProfileOrganizationRequest,
) => {
  const { api, validate } = httpDependencies<GetOrganizationProfileResponse>()
  const response = await api.request({
    url: '/admin/organization-profile',
    method: HttpMethod.PATCH,
    body: {
      legalName: data.legalName,
      tradeName: data.tradeName,
      email: data.email,
      phone: data.phone,
      status: data.status,
    },
  })

  const responseBody = validate.errors(response)
  const validatedResponse = GetOrganizationProfileModel.safeParse(responseBody)

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return responseBody
}

export const deleteOrganizationProfileService = async () => {
  const { api, validate } = httpDependencies<void>()
  const response = await api.request({
    url: '/admin/organization-profile',
    method: HttpMethod.DELETE,
  })

  return validate.errors(response)
}

export const getOrganizationProfileService = async () => {
  const { api, validate } = httpDependencies<GetOrganizationProfileResponse>()
  const response = await api.request({
    url: '/admin/organization-profile',
    method: HttpMethod.GET,
  })

  const responseBody = validate.errors(response)
  const validatedResponse = GetOrganizationProfileModel.safeParse(responseBody)

  if (!validatedResponse.success) {
    throw new BadRequestError(z.prettifyError(validatedResponse.error))
  }

  return responseBody
}
