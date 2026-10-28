import { useQueries } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { StickyNoteCheck, Users2Icon } from 'lucide-react'
import { type ElementType, useMemo } from 'react'

import { listInvitationsQueryOptions } from '@/features/invitations/queries/invitations.query-options'
import { StatusInvitations } from '@/features/invitations/types/status-invitations.type'

import { listMembersQueryOptions } from '../queries/member.query-options'

const authenticatedRoute = getRouteApi('/_authenticated')

export function useStatsSummaryMembers() {
  const { memberContext } = authenticatedRoute.useRouteContext()
  const [{ data: listMembers }, { data: listInvites }] = useQueries({
    queries: [
      listMembersQueryOptions(memberContext?.member.organizationId),
      listInvitationsQueryOptions(
        memberContext?.member.userId,
        memberContext?.member.organizationId,
      ),
    ],
  })

  const getMembers = useMemo<
    {
      icon: ElementType
      value: string
      title: string
    }[]
  >(() => {
    const filteredInvitesPending = listInvites?.invitations.filter(
      (invite) => invite.status === StatusInvitations.PENDING,
    )
    const totalMembers = listMembers?.total?.toString() ?? '0'
    const totalInvites = filteredInvitesPending?.length.toString() ?? '0'

    return [
      {
        icon: Users2Icon,
        value: totalMembers,
        title: 'Total de membros',
      },
      {
        icon: StickyNoteCheck,
        value: totalInvites,
        title: 'Convites pendentes',
      },
    ]
  }, [listMembers?.total, listInvites?.invitations])

  return {
    getMembers,
  }
}
