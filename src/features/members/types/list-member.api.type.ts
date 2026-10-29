import type { MemberRoleType } from './member-role.type'

export type MemberApiResponse = {
  id: string
  organizationId: string
  role: MemberRoleType
  createdAt: Date
  userId: string
  user: {
    id: string
    email: string
    name: string
    image?: string
  }
}

export type ListMemberApiResponse = {
  members: MemberApiResponse[]
  total: number
}
