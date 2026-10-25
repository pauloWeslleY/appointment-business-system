import { Box } from '@chakra-ui/react'
import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { Users2 } from 'lucide-react'

import EmptyStateTeamManagement from '@/components/empty-state-team-management'
import ListMembers from '@/features/members/components/list-members'
import { getMemberContextQueryOptions } from '@/features/members/queries/member.query-options'

export const Route = createFileRoute(
  '/_authenticated/team-management/members/',
)({
  loader: ({ context }) =>
    context.queryClient.query(getMemberContextQueryOptions()),
  component: MembersPage,
})

const routeTeamManagement = getRouteApi('/_authenticated/team-management')

function MembersPage() {
  const teamManagementRoute = routeTeamManagement.useLoaderData()

  if (teamManagementRoute.totalMembers === '0') {
    return (
      <EmptyStateTeamManagement
        icon={Users2}
        title="Nenhum membro encontrado"
        description="Os membros adicionados à sua organização aparecerão aqui."
      />
    )
  }

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <ListMembers />
    </Box>
  )
}
