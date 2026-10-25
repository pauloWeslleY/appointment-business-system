import { useQueries, useQueryClient } from '@tanstack/react-query'
import { StickyNoteCheck, Users2Icon } from 'lucide-react'
import { type ElementType, useMemo } from 'react'

import { listInvitationsQueryOptions } from '@/features/invitations/queries/invitations.query-options'

import { memberQueryKey } from '../queries/member.query-key'
import { listMembersQueryOptions } from '../queries/member.query-options'
import type { GetMemberDetailsResponse } from '../types/member-response.type'

export function useStatsSummaryMembers() {
  const queryClient = useQueryClient()
  const memberDetail = queryClient.getQueryData<GetMemberDetailsResponse>(
    memberQueryKey.context(),
  )
  const [listMembers, listInvites] = useQueries({
    queries: [
      listMembersQueryOptions(memberDetail?.member.organizationId),
      listInvitationsQueryOptions(
        memberDetail?.member.userId,
        memberDetail?.member.organizationId,
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
    const filteredInvitesPending = listInvites?.data?.invitations.filter(
      (invite) => invite.status === 'pending',
    )
    const totalMembers = listMembers?.data?.data?.total?.toString() ?? '0'
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
  }, [listMembers?.data?.data?.total, listInvites?.data?.invitations])

  return {
    getMembers,
  }
}
