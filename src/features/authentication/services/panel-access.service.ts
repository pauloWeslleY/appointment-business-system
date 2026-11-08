import { z } from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { GetPanelAccessApiResponseSchema } from '../schemas/get-panel-access-api.response.schema'
import type { PanelAccessApiType } from '../types/panel-access.api.type'

export async function getPanelAccess() {
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
