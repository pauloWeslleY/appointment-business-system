import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { GetMeContextSchema } from '../schemas/get-me-context.schema'
import type { CreateMeContextRequestType } from '../types/create-me-context-request.type'
import type { GetMeContextResponse } from '../types/member-response.type'

export const createMeContextService = async (
  data: CreateMeContextRequestType,
) => {
  const { api, validate } = httpDependencies<GetMeContextResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/me/context',
    body: data,
  })

  const validatedResponse = validate.errors(response)
  const parsedResponse = GetMeContextSchema.safeParse(validatedResponse)

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const getMeContextService = async (establishmentId?: string) => {
  const { api, validate } = httpDependencies<GetMeContextResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/me/context',
    params: {
      establishmentId,
    },
  })
  const parsedResponse = GetMeContextSchema.safeParse(validate.errors(response))
  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}
