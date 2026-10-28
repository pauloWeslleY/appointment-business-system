import z from 'zod'

import { authClient } from '@/lib/auth'
import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { GetMeContextSchema } from '../schemas/get-me-context.schema'
import { MemberDetailsSchema } from '../schemas/member-details.schema'
import type { CreateMeContextRequestType } from '../types/create-me-context-request.type'
import type {
  GetMeContextResponse,
  GetMemberDetailsResponse,
} from '../types/member-response.type'

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

export const getMemberDetailsService = async () => {
  const { api, validate } = httpDependencies<GetMemberDetailsResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/member-context',
  })

  const validatedResponse = validate.errors(response)
  const parsedResponse = MemberDetailsSchema.safeParse(validatedResponse)
  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export async function listMembersService(organizationId: string) {
  const result = await authClient.organization.listMembers({
    query: { organizationId },
  })

  if (result.error) {
    throw new Response(
      result.error.message || 'Erro ao consultar a organização.',
      {
        status: result.error.status,
      },
    )
  }

  return result.data
}
