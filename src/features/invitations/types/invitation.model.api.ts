import type z from 'zod'

import { type GetInvitationPreviewApiSchema } from '@/features/invitations/schemas/get-invitation-preview.schema'
import { type InvitationApiResponseSchema } from '@/features/invitations/schemas/invitation-api.schema'

import { type ListInvitationsApiSchema } from '../schemas/list-invitations-api.schema'

export type InvitationApiResponse = z.infer<typeof InvitationApiResponseSchema>

export type ListInvitationsApiResponse = z.infer<
  typeof ListInvitationsApiSchema
>

export type InviteProps = ListInvitationsApiResponse['invitations'][number]

export type GetInvitationApiResponsePreview = z.infer<
  typeof GetInvitationPreviewApiSchema
>
