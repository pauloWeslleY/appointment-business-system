import type { ColorPalette } from '@chakra-ui/react'
import z from 'zod'

export const MemberRoles = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
  PROFESSIONAL: 'professional',
  COLLABORATOR: 'collaborator',
} as const

export const MEMBER_ROLES = Object.values(MemberRoles)

export const MemberRoleSchema = z.enum(MEMBER_ROLES)

export type MemberRoleType = (typeof MEMBER_ROLES)[number]

interface MemberRoleLabel {
  label: string
  color: ColorPalette
}

export const mapLabelMemberRole = (
  role: MemberRoleType = MemberRoles.MEMBER,
): MemberRoleLabel => {
  const map: Record<MemberRoleType, MemberRoleLabel> = {
    [MemberRoles.OWNER]: { label: 'Proprietário', color: 'blue' },
    [MemberRoles.ADMIN]: { label: 'Administrador', color: 'purple' },
    [MemberRoles.MEMBER]: { label: 'Membro', color: 'green' },
    [MemberRoles.PROFESSIONAL]: { label: 'Profissional', color: 'teal' },
    [MemberRoles.COLLABORATOR]: { label: 'Colaborador', color: 'orange' },
  }

  return map[role]
}

export const loadSelectMemberRole = Array.from(MEMBER_ROLES).map((role) => ({
  value: role,
  label: mapLabelMemberRole(role),
}))
