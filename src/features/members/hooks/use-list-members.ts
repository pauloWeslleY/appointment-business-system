import { useQuery } from '@tanstack/react-query'
import { useLocation } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'

import { listMembersQueryOptions } from '../queries/member.query-options'

export function useListMembers() {
  const { search } = useLocation()
  const { data: session } = authClient.useSession()
  const { data: members, isLoading: isLoadingMembers } = useQuery(
    listMembersQueryOptions(session?.session.activeOrganizationId ?? undefined),
  )
  const listAllMembers = members?.members ?? []
  const hasExistingMembers = listAllMembers.length > 0 && !isLoadingMembers

  const listFilteredMembers = (members?.members ?? []).filter((member) => {
    const searchQuery = search.q ?? ''
    return member.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return {
    isLoadingMembers,
    hasExistingMembers,
    listFilteredMembers,
  }
}
