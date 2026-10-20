import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'
import { headerIdempontecyKey } from '@/shared/utils/idempontecy-key'

import { CreateOrganizationProfileApiResponse } from '../schemas/create-organization-profile.schema'
import {
  type CreateProfileOrganizationRequest,
  type CreateProfileOrganizationResponse,
} from '../types/create-organization-profile.api'

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
