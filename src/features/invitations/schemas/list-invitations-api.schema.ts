import z from 'zod'

import { MemberRoleSchema } from '@/features/members/types/member-role.type'

import { StatusInvitationsSchema } from '../types/status-invitations.type'

export const InvitationsApiSchema = z.object({
  id: z.string('ID inválido'),
  email: z.email('Email inválido'),
  role: MemberRoleSchema,
  status: StatusInvitationsSchema,
  expiresAt: z.iso.datetime({ offset: true }),
  establishmentIds: z.array(
    z.uuid('ID de estabelecimento inválido'),
    'IDs de estabelecimento inválidos',
  ),
})

export const ListInvitationsApiSchema = z.object({
  invitations: z.array(InvitationsApiSchema),
})
