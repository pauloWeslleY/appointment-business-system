import { Box, Card, HStack, Icon, Tabs } from '@chakra-ui/react'
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router'
import { MailsIcon, Users2 } from 'lucide-react'

import Header from '@/components/layout/header'
import PageLoader from '@/components/page-loader'
import { listInvitationsQueryOptions } from '@/features/invitations/queries/invitations.query-options'
import StatsSummaryMembers from '@/features/members/pages/stats-summary-members'
import { listMembersQueryOptions } from '@/features/members/queries/member.query-options'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/_admin/team-management',
)({
  pendingComponent: PageLoader,
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
    meta: [{ title: 'Equipe e acessos | Agendros' }],
  }),
})

function RouteComponent() {
  const { totalMembers, totalInvitations } = Route.useLoaderData()
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

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

        <Card.Root
          css={cardSectionCss}
          variant="outline"
          display="flex"
          flexDir="column"
          gap="3"
        >
          <Tabs.Root value={pathname} size="sm">
            <Tabs.List
              flexWrap="wrap"
              borderColor={{ _light: 'gray.100', _dark: 'slate.900' }}
            >
              <Tabs.Trigger value="/team-management/members" asChild>
                <Link to="/team-management/members">
                  <Icon
                    as={Users2}
                    boxSize="4"
                    color={{ _light: 'sea.700', _dark: 'sea.300' }}
                    mr="2"
                  />
                  {`Membros (${totalMembers})`}
                </Link>
              </Tabs.Trigger>

              <Tabs.Trigger value="/team-management/invitations" asChild>
                <Link to="/team-management/invitations">
                  <Icon
                    as={MailsIcon}
                    boxSize="4"
                    color={{ _light: 'sea.700', _dark: 'sea.300' }}
                    mr="2"
                  />
                  {`Convites (${totalInvitations})`}
                </Link>
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>

          <Outlet />
        </Card.Root>
      </Box>
    </Box>
  )
}
