import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getActiveMemberService,
  listMembersService,
} from '../services/member.service'
import { memberQueryKey } from './member.query-key'

export const listMembersQueryOptions = (organizationId?: string) => {
  return queryOptions({
    queryKey: memberQueryKey.members(organizationId),
    queryFn:
      organizationId !== undefined && organizationId !== ''
        ? () => listMembersService(organizationId)
        : skipToken,
  })
}

export const getActiveMemberQueryOptions = (
  organizationId?: string,
  memberId?: string,
) => {
  return queryOptions({
    queryKey: memberQueryKey.activeMember(organizationId, memberId),
    queryFn:
      organizationId !== undefined &&
      organizationId !== '' &&
      memberId !== undefined &&
      memberId !== ''
        ? () => getActiveMemberService(organizationId, memberId)
        : skipToken,
  })
}
