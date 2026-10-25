import z from 'zod'

import { BadRequestError } from '@/shared/errors'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'

import { AcceptInvitationApiResponseSchema } from '../schemas/accept-invitation.api.schema'
import { InvitationApiResponseSchema } from '../schemas/invitation-api.schema'
import { ListInvitationsApiSchema } from '../schemas/list-invitations-api.schema'
import { SendInvitationsSchema } from '../schemas/send-invitation.schema'
import type { AcceptInvitationApiResponse } from '../types/accept-invitation.api.type'
import type {
  InvitationApiResponse,
  ListInvitationsApiResponse,
} from '../types/invitation.model.api'
import type { SendInvitationApiRequest } from '../types/send-invitation.api.type'

export const listInvitationsService = async (signal?: AbortSignal) => {
  const { api, validate } = httpDependencies<ListInvitationsApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/invitations',
    signal,
  })
  const parsedResponse = ListInvitationsApiSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const sendInvitationService = async (data: SendInvitationApiRequest) => {
  const { api, validate } = httpDependencies<InvitationApiResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: '/admin/invitations',
    body: SendInvitationsSchema.parse(data),
  })
  const parsedResponse = InvitationApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const cancelInvitationService = async (invitationId: string) => {
  const { api, validate } = httpDependencies<InvitationApiResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: `/admin/invitations/${encodeURIComponent(z.string().min(1).parse(invitationId))}/cancel`,
  })
  const parsedResponse = InvitationApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

// Account
export const acceptInvitationService = async (invitationId: string) => {
  const { api, validate } = httpDependencies<AcceptInvitationApiResponse>()
  const response = await api.request({
    method: HttpMethod.POST,
    url: `/account/invitations/${encodeURIComponent(z.string().min(1).parse(invitationId))}/accept`,
  })
  const parsedResponse = AcceptInvitationApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}

export const getInvitationService = async (
  invitationId: string,
  signal?: AbortSignal,
) => {
  const { api, validate } = httpDependencies<InvitationApiResponse>()
  const response = await api.request({
    method: HttpMethod.GET,
    signal,
    url: `/account/invitations/${encodeURIComponent(z.string().min(1).parse(invitationId))}`,
  })
  const parsedResponse = InvitationApiResponseSchema.safeParse(
    validate.errors(response),
  )

  if (!parsedResponse.success) {
    throw new BadRequestError(z.prettifyError(parsedResponse.error))
  }

  return parsedResponse.data
}
