import { useQuery } from '@tanstack/react-query'
import { useLocation } from '@tanstack/react-router'
import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs'

import { authClient } from '@/lib/auth'

import { listMembersQueryOptions } from '../queries/member.query-options'

const shortId = (id: string) => id.slice(0, 8)

export function useListMembers() {
  const [memberSelected, setMemberSelected] = useQueryState(
    'member_id',
    parseAsString,
  )
  const [isSidebarOpen, setIsSidebarOpen] = useQueryState(
    'is_open',
    parseAsBoolean.withDefault(false),
  )
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

  const selectedMember = listFilteredMembers.find((member) =>
    memberSelected ? member.id.includes(memberSelected) : false,
  )

  const handleSelectMemberAndSidebarOpen = (memberId: string) => {
    setMemberSelected(shortId(memberId))
    setIsSidebarOpen(true)
  }

  return {
    memberSelected,
    selectedMember,
    hasExistingMembers,
    listFilteredMembers,
    isLoadingMembers,
    isSidebarOpen,
    setIsSidebarOpen,
    handleSelectMemberAndSidebarOpen,
  }
}
