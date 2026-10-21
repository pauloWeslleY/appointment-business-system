import { Box, Button, HStack, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { UserRoundPlus, Users2 } from 'lucide-react'

import Header from '@/components/layout/header'
import ListMembers from '@/features/members/components/list-members'
import StatsSummaryMembers from '@/features/members/pages/stats-summary-members'
import { getMemberContextQueryOptions } from '@/features/members/queries/member.query-options'

export const Route = createFileRoute('/_authenticated/members/')({
  loader: ({ context }) =>
    context.queryClient.query(getMemberContextQueryOptions()),
  component: MembersPage,
})

function MembersPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root align="center" justify="space-between">
        <HStack align="center">
          <Header.Icon icon={Users2} />
          <Header.Title>Membros</Header.Title>
        </HStack>

        <Button rounded="lg" size="xs">
          <Icon as={UserRoundPlus} boxSize="5" />
          Convidar Membro
        </Button>
      </Header.Root>

      <Box spaceY="4">
        <StatsSummaryMembers />
        <ListMembers />
      </Box>
    </Box>
  )
}
