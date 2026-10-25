import z from 'zod'

import { MemberAccessScopeSchema } from '@/features/members/types/member-access-scope.type'
import { MemberRoleSchema } from '@/features/members/types/member-role.type'

import { StatusInvitationsSchema } from '../types/status-invitations.type'

export const InvitationApiSchema = z.object({
  id: z.string('ID inválido'),
  organizationId: z.string('ID de organização inválido'),
  inviterId: z.string('ID do convidador inválido'),
  email: z.email('Email inválido'),
  role: MemberRoleSchema,
  status: StatusInvitationsSchema,
  expiresAt: z.iso.datetime({ offset: true }),
  accessScope: MemberAccessScopeSchema,
  establishmentIds: z.array(
    z.uuid('ID de estabelecimento inválido'),
    'IDs de estabelecimento inválidos',
  ),
  acceptedMemberId: z.string().nullable(),
  acceptedUserId: z.string().nullable(),
})

export const InvitationApiResponseSchema = z.object({
  invitation: InvitationApiSchema,
})
