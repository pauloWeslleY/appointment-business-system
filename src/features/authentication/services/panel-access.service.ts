import { z } from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { GetPanelAccessApiResponseSchema } from '../schemas/get-panel-access-api.response.schema'
import { StartBusinessOnboardingResponseSchema } from '../schemas/start-business-onboarding-api.response.schema'
import type { PanelAccessApiType } from '../types/panel-access.api.type'
import type { StartBusinessOnboardingApiResponse } from '../types/start-business-onboarding.api.type'

export async function getPanelAccessService() {
  const { api, validate } = httpDependencies<PanelAccessApiType>()
  const response = await api.request({
    url: '/me/access',
    method: HttpMethod.GET,
  })
  const validateResponse = GetPanelAccessApiResponseSchema.safeParse(
    validate.errors(response),
  )
  if (!validateResponse.success) {
    throw new BadRequestError(z.prettifyError(validateResponse.error))
  }
  return validateResponse.data
}

export async function startBusinessOnboardingService() {
  const { api, validate } =
    httpDependencies<StartBusinessOnboardingApiResponse>()
  const response = await api.request({
    url: '/me/business-onboarding',
    method: HttpMethod.POST,
    body: {
      confirmBusinessRegistration: true,
    },
  })
  const validateResponse = StartBusinessOnboardingResponseSchema.safeParse(
    validate.errors(response),
  )
  if (!validateResponse.success) {
    throw new BadRequestError(z.prettifyError(validateResponse.error))
  }

  return validateResponse.data
}
