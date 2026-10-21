import { queryOptions } from '@tanstack/react-query'

import { authClient } from '@/lib/auth'

import { getMemberDetailsService } from '../services/member.service'
import { getMeContextService } from '../services/member-context.service'
import { memberQueryKey } from './member.query-key'

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
    queryFn: () => {
      return authClient.organization.listMembers({
        query: { organizationId },
      })
    },
    enabled: !!organizationId,
  })
}
