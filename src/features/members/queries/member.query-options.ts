import { queryOptions, skipToken } from '@tanstack/react-query'

import {
  getActiveMemberService,
  getMemberDetailsService,
  listMembersService,
} from '../services/member.service'
import { getMeContextService } from '../services/member-context.service'
import { memberQueryKey } from './member.query-key'

export const memberContextQueryOptions = (
  userId?: string,
  organizationId?: string,
  establishmentId?: string,
) => {
  return queryOptions({
    queryKey: memberQueryKey.meContextByOrganization(
      organizationId,
      userId,
      establishmentId,
    ),
    queryFn: () => getMeContextService(establishmentId),
    staleTime: 0,
  })
}

export const getMeContextQueryOptions = (establishmentId?: string) => {
  return queryOptions({
    queryKey: memberQueryKey.detail(establishmentId),
    queryFn: () => getMeContextService(establishmentId),
    enabled: !!establishmentId,
  })
}

export const getMemberContextQueryOptions = () => {
  return queryOptions({
    queryKey: memberQueryKey.context(),
    queryFn: getMemberDetailsService,
  })
}

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
