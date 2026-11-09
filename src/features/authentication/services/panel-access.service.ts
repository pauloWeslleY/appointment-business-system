import { z } from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { StartBusinessOnboardingResponseSchema } from '../schemas/start-business-onboarding-api.response.schema'
import type { StartBusinessOnboardingApiResponse } from '../types/start-business-onboarding.api.type'

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
