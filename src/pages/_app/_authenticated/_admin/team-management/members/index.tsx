import { Box } from '@chakra-ui/react'
import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { Users2 } from 'lucide-react'

import EmptyStateTeamManagement from '@/components/empty-state-team-management'
import ListMembers from '@/features/members/components/list-members'

export const Route = createFileRoute(
  '/_app/_authenticated/_admin/team-management/members/',
)({
  component: MembersPage,
})

const routeTeamManagement = getRouteApi(
  '/_app/_authenticated/_admin/team-management',
)

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
