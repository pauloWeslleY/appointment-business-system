import { Box, Card, HStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { UserCog } from 'lucide-react'
import { z } from 'zod'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterSelectStatusCollaborator from '@/features/collaborators/components/filter-collaborators-status'
import SidebarCreateCollaborators from '@/features/collaborators/components/sidebar-create-collaborators'
import CollaboratorsTablePage from '@/features/collaborators/pages/collaborators.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/collaborators/',
)({
  validateSearch: z.object({
    q: z.string().optional(),
    status: z.string().optional(),
  }),
  component: CollaboratorsPage,
})

function CollaboratorsPage() {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root justify="space-between" align="center">
        <HStack gap="2" align="center">
          <Header.Icon icon={UserCog} />
          <Header.Title>Colaboradores</Header.Title>
        </HStack>

        <SidebarCreateCollaborators />
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <HStack mb="4">
          <SearchPage />
          <FilterSelectStatusCollaborator />
        </HStack>

        <CollaboratorsTablePage />
      </Card.Root>
    </Box>
  )
}
