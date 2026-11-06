import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { GetMeContextSchema } from '../schemas/get-me-context.schema'
import { MemberContextScopeSchema } from '../schemas/member-context-scope.schema'
import type { CreateMeContextRequestType } from '../types/create-me-context-request.type'
import type { MemberContextScope } from '../types/member-context-scope.type'
import type { GetMeContextResponse } from '../types/member-response.type'

export const createMeContextService = async (
  data: CreateMeContextRequestType,
): Promise<GetMeContextResponse> => {
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

export const getMeContextService = async (
  input: MemberContextScope,
  signal?: AbortSignal,
): Promise<GetMeContextResponse> => {
  const scope = MemberContextScopeSchema.parse(input)
  const { api, validate } = httpDependencies<GetMeContextResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/me/context',
    signal,
    params: {
      establishmentId: scope.establishmentId,
    },
  })

  const parsedResponse = GetMeContextSchema.safeParse(validate.errors(response))
  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  const context = parsedResponse.data
  const matchesRequestedScope =
    context.user.id === scope.userId &&
    context.organization.id === scope.organizationId

  if (!matchesRequestedScope) {
    throw new BadRequestError(
      'O contexto não corresponde ao usuário e à organização selecionados.',
    )
  }

  return context
}
