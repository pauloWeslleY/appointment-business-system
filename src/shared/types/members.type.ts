import type { FullOrganization } from '@/features/organization-profile/services/organization.service'

export const MEMBER_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
} as const

export type Member = FullOrganization['members'][number]
export type MemberRole = Member['role']

export const getMemberRoleLabel = (role?: MemberRole): string => {
  const mapMemberRoleToLabel: Record<MemberRole, string> = {
    [MEMBER_ROLES.OWNER]: 'Proprietário',
    [MEMBER_ROLES.ADMIN]: 'Administrador',
    [MEMBER_ROLES.MEMBER]: 'Membro',
  } as const

  return mapMemberRoleToLabel[role ?? MEMBER_ROLES.MEMBER]
}
