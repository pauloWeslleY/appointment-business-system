import { Box, For, HStack } from '@chakra-ui/react'
import {
  createFileRoute,
  Link,
  type LinkProps,
  Outlet,
  useLocation,
} from '@tanstack/react-router'
import { Users2 } from 'lucide-react'

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
      totalMembers: membersResult?.total.toString() ?? '0',
      totalInvitations:
        invitationsResult?.invitations?.length.toString() ?? '0',
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { totalMembers, totalInvitations } = Route.useLoaderData()
  const { pathname } = useLocation()

  const menuNavigationTeamManagement = (input: {
    label: string
    to: LinkProps['to']
    active: boolean
  }) => ({ label: input.label, to: input.to, active: input.active })

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <HStack align="center">
          <Header.Icon icon={Users2} />
          <Header.Title>Equipe e acessos</Header.Title>
        </HStack>
      </Header.Root>

      <Box spaceY="4">
        <StatsSummaryMembers />

        <MenuNavigation.Root>
          <For
            each={[
              menuNavigationTeamManagement({
                label: `Membros (${totalMembers})`,
                to: '/team-management/members',
                active: pathname.includes('members'),
              }),
              menuNavigationTeamManagement({
                label: `Convites (${totalInvitations})`,
                to: '/team-management/invitations',
                active: pathname.includes('invitations'),
              }),
            ]}
          >
            {({ label, to, active }) => (
              <MenuNavigation.Link active={active} asChild>
                <Link to={to}>{label}</Link>
              </MenuNavigation.Link>
            )}
          </For>
        </MenuNavigation.Root>

        <Outlet />
      </Box>
    </Box>
  )
}
