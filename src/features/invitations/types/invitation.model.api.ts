import type z from 'zod'

import { type InvitationApiResponseSchema } from '@/features/invitations/schemas/invitation-api.schema'

import { type ListInvitationsApiSchema } from '../schemas/list-invitations-api.schema'

export type InvitationApiResponse = z.infer<typeof InvitationApiResponseSchema>

export type ListInvitationsApiResponse = z.infer<
  typeof ListInvitationsApiSchema
>
