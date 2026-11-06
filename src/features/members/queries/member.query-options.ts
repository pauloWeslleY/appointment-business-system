import { queryOptions, skipToken } from '@tanstack/react-query'

import { AUTHENTICATION_CACHE_POLICY } from '@/features/authentication/constants/authentication-cache'

import {
  getActiveMemberService,
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
    queryFn:
      userId && organizationId
        ? ({ signal }) =>
            getMeContextService(
              { userId, organizationId, establishmentId },
              signal,
            )
        : skipToken,
    ...AUTHENTICATION_CACHE_POLICY,
    retry: false,
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
