import { For, SimpleGrid } from '@chakra-ui/react'
import { useQueries, useQueryClient } from '@tanstack/react-query'
import { StickyNoteCheck, Users2Icon } from 'lucide-react'
import { type ElementType, useMemo } from 'react'

import { authClient } from '@/lib/auth'

import CardStatMember from '../components/card-stat-member'
import { memberQueryKey } from '../queries/member.query-key'
import { listMembersQueryOptions } from '../queries/member.query-options'
import type { GetMemberDetailsResponse } from '../types/member-response.type'

const StatsSummaryMembers = () => {
  const queryClient = useQueryClient()
  const memberDetail = queryClient.getQueryData<GetMemberDetailsResponse>(
    memberQueryKey.context(),
  )
  const [listMembers, listInvites] = useQueries({
    queries: [
      listMembersQueryOptions(memberDetail?.member.organizationId),
      {
        queryKey: ['invites'],
        queryFn: () => {
          return authClient.organization.listInvitations({
            query: { organizationId: memberDetail?.member.organizationId },
          })
        },
      },
    ],
  })

  const getMembers = useMemo(() => {
    const totalMembers = listMembers?.data?.data?.total?.toString() ?? '0'
    const totalInvites = listInvites?.data?.data?.filter(
      (invite) => invite.status === 'pending',
    )

    return [
      {
        icon: Users2Icon,
        value: totalMembers,
        label: 'Total de membros',
      },
      {
        icon: StickyNoteCheck,
        value: totalInvites?.length.toString() ?? '0',
        label: 'Convites pendentes',
      },
    ]
  }, [listMembers?.data?.data?.total, listInvites?.data?.data])

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={4}>
      <For each={getMembers}>
        {(item) => (
          <CardStatMember
            key={item.label}
            stat={{
              icon: item.icon as ElementType,
              value: item.value,
              title: item.label,
            }}
          />
        )}
      </For>
    </SimpleGrid>
  )
}

export default StatsSummaryMembers
