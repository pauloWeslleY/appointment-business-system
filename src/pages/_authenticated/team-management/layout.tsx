import { Box, Button, HStack, Icon } from '@chakra-ui/react'
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router'
import { UserRoundPlus, Users2 } from 'lucide-react'

import Header from '@/components/layout/header'
import { MenuNavigation } from '@/components/menu-nav-links'
import { listInvitationsQueryOptions } from '@/features/invitations/queries/invitations.query-options'
import StatsSummaryMembers from '@/features/members/pages/stats-summary-members'
import { listMembersQueryOptions } from '@/features/members/queries/member.query-options'
import { authClient } from '@/lib/auth'

export const Route = createFileRoute('/_authenticated/team-management')({
  loader: async ({ context }) => {
    const { data: session } = await authClient.getSession()
    const [invitationsResult, membersResult] = await Promise.all([
      context.queryClient.query(
        listInvitationsQueryOptions(
          session?.user.id,
          session?.session.activeOrganizationId ?? undefined,
        ),
      ),
      context.queryClient.query(
        listMembersQueryOptions(
          session?.session?.activeOrganizationId ?? undefined,
        ),
      ),
    ])
    return {
      totalMembers: membersResult?.data?.total.toString() ?? '0',
      totalInvitations:
        invitationsResult?.invitations?.length.toString() ?? '0',
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { totalMembers, totalInvitations } = Route.useLoaderData()
  const { pathname } = useLocation()

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root align="center" justify="space-between">
        <HStack align="center">
          <Header.Icon icon={Users2} />
          <Header.Title>Equipe e acessos</Header.Title>
        </HStack>

        <Button rounded="lg" size="xs">
          <Icon as={UserRoundPlus} boxSize="5" />
          Convidar Membro
        </Button>
      </Header.Root>

      <Box spaceY="4">
        <StatsSummaryMembers />

        <MenuNavigation.Root>
          <MenuNavigation.Link active={pathname.includes('members')} asChild>
            <Link to="/team-management/members">Membros ({totalMembers})</Link>
          </MenuNavigation.Link>
          <MenuNavigation.Link
            active={pathname.includes('invitations')}
            asChild
          >
            <Link to="/team-management/invitations">
              Convites ({totalInvitations})
            </Link>
          </MenuNavigation.Link>
        </MenuNavigation.Root>

        <Outlet />
      </Box>
    </Box>
  )
}
