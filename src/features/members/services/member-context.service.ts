import z from 'zod'

import { AuthenticatedContextApiResponseSchema } from '@/features/authentication/schemas/authenticated-context.schema'
import type { AuthenticatedContextApiResponse } from '@/features/authentication/types/authenticated-context.type'
import { hasOperationalContext } from '@/features/authentication/validations/has-operational-context'
import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { CreateMeContextRequest } from '../schemas/create-me-context.schema'
import type { CreateMeContextRequestType } from '../types/create-me-context-request.type'
import type { GetMeContextResponse } from '../types/member-response.type'

export const createMeContextService = async (
  data: CreateMeContextRequestType,
): Promise<AuthenticatedContextApiResponse & GetMeContextResponse> => {
  const validatedBody = CreateMeContextRequest.parse(data)
  const { api, validate } = httpDependencies<AuthenticatedContextApiResponse>()

  const response = await api.request({
    method: HttpMethod.POST,
    url: '/me/context',
    body: validatedBody,
  })
  const parsedResponse = AuthenticatedContextApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  const context = parsedResponse.data
  const validatedOperationalContext = !hasOperationalContext(context)

  if (validatedOperationalContext) {
    throw new BadRequestError(
      'A seleção não retornou um contexto empresarial ativo e completo.',
    )
  }

  const validateOrganization =
    context.organization.id === validatedBody.organizationId
  const validateEstablishment =
    validatedBody.establishmentId === undefined ||
    context.establishmentId === validatedBody.establishmentId

  if (!validateOrganization || !validateEstablishment) {
    throw new BadRequestError(
      'O contexto retornado não corresponde à empresa ou ao estabelecimento selecionado.',
    )
  }

  return context
}
