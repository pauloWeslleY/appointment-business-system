import type { ColorPalette } from '@chakra-ui/react'
import z from 'zod'

export const MEMBER_STATUSES = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  REVOKED: 'revoked',
} as const

export const MemberStatusSchema = z.enum(MEMBER_STATUSES)

export type MemberStatusType =
  (typeof MEMBER_STATUSES)[keyof typeof MEMBER_STATUSES]

export const loadMemberStatus = new Set<MemberStatusType>([
  MEMBER_STATUSES.ACTIVE,
  MEMBER_STATUSES.SUSPENDED,
  MEMBER_STATUSES.REVOKED,
])

interface MemberStatusLabel {
  label: string
  color: ColorPalette
}

export const mapLabelMemberStatus = (
  status: MemberStatusType = MEMBER_STATUSES.ACTIVE,
): MemberStatusLabel => {
  const map: Record<MemberStatusType, MemberStatusLabel> = {
    [MEMBER_STATUSES.ACTIVE]: { label: 'Ativo', color: 'green' },
    [MEMBER_STATUSES.SUSPENDED]: { label: 'Suspenso', color: 'yellow' },
    [MEMBER_STATUSES.REVOKED]: { label: 'Revogado', color: 'red' },
  }

  return map[status]
}

export const loadSelectMemberStatus = Array.from(loadMemberStatus).map(
  (status) => ({
    value: status,
    label: mapLabelMemberStatus(status),
  }),
)
