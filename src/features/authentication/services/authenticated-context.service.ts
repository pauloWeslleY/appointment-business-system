import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { AuthenticatedContextApiResponseSchema } from '../schemas/authenticated-context.schema'
import type {
  AuthenticatedContextApiRequest,
  AuthenticatedContextApiResponse,
} from '../types/authenticated-context.type'

export const getAuthenticatedContextService = async (
  params: AuthenticatedContextApiRequest,
  signal?: AbortSignal,
): Promise<AuthenticatedContextApiResponse> => {
  const { api, validate } = httpDependencies<AuthenticatedContextApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/me/context',
    signal,
  })
  const validateResponse = AuthenticatedContextApiResponseSchema.safeParse(
    validate.errors(response),
  )
  if (!validateResponse.success) {
    throw new BadRequestError(z.prettifyError(validateResponse.error))
  }

  const authContext = validateResponse.data
  const verifyAuthUser = authContext.user.id === params.userId
  const validateOrganization =
    authContext.organization === null ||
    authContext.organization.id === params.organizationId

  if (!verifyAuthUser || !validateOrganization) {
    throw new BadRequestError(
      'O Contexto não corresponde ao usuário e à empresa selecionada!',
    )
  }

  return authContext
}
