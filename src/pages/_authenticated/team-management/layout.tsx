import { Box, For, HStack } from '@chakra-ui/react'
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router'
import { Users2 } from 'lucide-react'

import Header from '@/components/layout/header'
import { MenuNavigation } from '@/components/menu-nav-links'
import { listInvitationsQueryOptions } from '@/features/invitations/queries/invitations.query-options'
import StatsSummaryMembers from '@/features/members/pages/stats-summary-members'
import { listMembersQueryOptions } from '@/features/members/queries/member.query-options'

export const Route = createFileRoute('/_authenticated/team-management')({
  loader: async ({ context }) => {
    const organizationId =
      context.session?.session.activeOrganizationId ?? undefined
    const [invitationsResult, membersResult] = await Promise.all([
      context.queryClient.query(
        listInvitationsQueryOptions(context.session?.user.id, organizationId),
      ),
      context.queryClient.query(listMembersQueryOptions(organizationId)),
    ])

    return {
      totalMembers: membersResult?.total.toString() ?? '0',
      totalInvitations:
        invitationsResult?.invitations?.length.toString() ?? '0',
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Equipe e acessos' }],
  }),
})

function RouteComponent() {
  const { totalMembers, totalInvitations } = Route.useLoaderData()
  const { pathname } = useLocation()

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
              {
                label: `Membros (${totalMembers})`,
                to: '/team-management/members',
                active: pathname.includes('members'),
              },
              {
                label: `Convites (${totalInvitations})`,
                to: '/team-management/invitations',
                active: pathname.includes('invitations'),
              },
            ]}
          >
            {({ label, to, active }, index) => (
              <MenuNavigation.Link key={index} active={active} asChild>
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
