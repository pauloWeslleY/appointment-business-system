import z from 'zod'

import { authClient } from '@/lib/auth'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { GetMeContextSchema } from '../schemas/get-me-context.schema'
import { MemberDetailsSchema } from '../schemas/member-details.schema'
import {
  UpdateRoleMemberRequestApiSchema,
  UpdateRoleMemberResponseApiSchema,
} from '../schemas/update-role-member.api.schema'
import {
  UpdateScopeMemberRequestApiSchema,
  UpdateScopeMemberResponseApiSchema,
} from '../schemas/update-scope-member.api.schema'
import {
  UpdateStatusMemberRequestApiSchema,
  UpdateStatusMemberResponseApiSchema,
} from '../schemas/update-status-member.api.schema'
import type { CreateMeContextRequestType } from '../types/create-me-context-request.type'
import type {
  GetMeContextResponse,
  GetMemberDetailsResponse,
} from '../types/member-response.type'
import type {
  UpdateRoleMemberRequestType,
  UpdateRoleMemberResponseType,
} from '../types/update-role-member.type'
import type {
  UpdateScopeMemberRequestType,
  UpdateScopeMemberResponseType,
} from '../types/update-scope-member.type'
import type {
  UpdateStatusMemberRequestType,
  UpdateStatusMemberResponseType,
} from '../types/update-status-member.type'

export const createMeContextService = async (
  data: CreateMeContextRequestType,
) => {
  const { api, validate } = httpDependencies<GetMeContextResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/me/context',
    body: data,
  })
  const parsedResponse = GetMeContextSchema.safeParse(validate.errors(response))

  if (!parsedResponse.success) {
    throw new Response(z.prettifyError(parsedResponse.error), { status: 400 })
  }

  return parsedResponse.data
}

export const getMemberDetailsService = async () => {
  const { api, validate } = httpDependencies<GetMemberDetailsResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/member-context',
  })
  const parsedResponse = MemberDetailsSchema.safeParse(
    validate.errors(response),
  )
  if (!parsedResponse.success) {
    throw new Response(z.prettifyError(parsedResponse.error), { status: 400 })
  }

  return parsedResponse.data
}

export const updateScopeMemberService = async (
  data: UpdateScopeMemberRequestType,
) => {
  const request = UpdateScopeMemberRequestApiSchema.parse(data)
  const { api, validate } = httpDependencies<UpdateScopeMemberResponseType>()
  const response = await api.request({
    method: HttpMethod.PUT,
    url: `/admin/members/${request.memberId}/scope`,
    body: {
      accessScope: request.accessScope[0],
      establishmentIds: request.establishmentIds,
    },
  })
  const parsedResponse = UpdateScopeMemberResponseApiSchema.safeParse(
    validate.errors(response),
  )
  if (!parsedResponse.success) {
    throw new Response(z.prettifyError(parsedResponse.error), { status: 400 })
  }

  return parsedResponse.data
}

export const updateRoleMemberService = async (
  data: UpdateRoleMemberRequestType,
) => {
  const request = UpdateRoleMemberRequestApiSchema.parse(data)
  const { api, validate } = httpDependencies<UpdateRoleMemberResponseType>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/members/${request.memberId}/role`,
    body: {
      role: request.role,
    },
  })
  const parsedResponse = UpdateRoleMemberResponseApiSchema.safeParse(
    validate.errors(response),
  )
  if (!parsedResponse.success) {
    throw new Response(z.prettifyError(parsedResponse.error), { status: 400 })
  }

  return parsedResponse.data
}

export const updateStatusMemberService = async (
  data: UpdateStatusMemberRequestType,
) => {
  const request = UpdateStatusMemberRequestApiSchema.parse(data)
  const { api, validate } = httpDependencies<UpdateStatusMemberResponseType>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: `/admin/members/${request.memberId}/status`,
    body: {
      status: request.status,
    },
  })
  const parsedResponse = UpdateStatusMemberResponseApiSchema.safeParse(
    validate.errors(response),
  )
  if (!parsedResponse.success) {
    throw new Response(z.prettifyError(parsedResponse.error), { status: 400 })
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
