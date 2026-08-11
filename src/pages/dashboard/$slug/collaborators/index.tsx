import { Alert, Box, Card, HStack, Skeleton, Stack } from '@chakra-ui/react'
import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { UserCog } from 'lucide-react'
import { z } from 'zod'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterSelectStatusCollaborator from '@/features/collaborators/components/filter-collaborators-status'
import SidebarCreateCollaborators from '@/features/collaborators/components/sidebar-create-collaborators'
import StatInfoCollaborators from '@/features/collaborators/components/stat-info-collaborators'
import { useGetAllCollaboratorsByEstablishment } from '@/features/collaborators/hooks/use-get-all-collaborators-by-establishment'
import CollaboratorsTablePage from '@/features/collaborators/pages/collaborators.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/dashboard/$slug/collaborators/')({
  validateSearch: z.object({
    status: z.string().optional(),
    q: z.string().optional(),
  }),
  component: CollaboratorsPage,
})

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

function CollaboratorsPage() {
  const establishment = dashboardSlugRoute.useLoaderData()
  const {
    data: getCollaborators,
    isLoading: isLoadingCollaborators,
    error: errorCollaborators,
  } = useGetAllCollaboratorsByEstablishment(establishment.id)

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root justify="space-between" align="center">
        <HStack gap="2" align="center">
          <Header.Icon icon={UserCog} />
          <Header.Title>Colaboradores</Header.Title>
        </HStack>

        <SidebarCreateCollaborators />
      </Header.Root>

      {errorCollaborators && (
        <Alert.Root status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>{errorCollaborators.message}</Alert.Title>
        </Alert.Root>
      )}

      {isLoadingCollaborators && (
        <Stack gap="2" w="full" p="2">
          <Skeleton height="40px" rounded="xl" />
          <Skeleton height="40px" rounded="xl" />
          <Skeleton height="40px" rounded="xl" />
        </Stack>
      )}

      {!isLoadingCollaborators && !errorCollaborators && (
        <Box spaceY="4">
          <StatInfoCollaborators />

          <HStack>
            <SearchPage />
            <FilterSelectStatusCollaborator />
          </HStack>

          <Card.Root variant="outline" css={cardSectionCss}>
            <CollaboratorsTablePage collaborators={getCollaborators ?? []} />
          </Card.Root>
        </Box>
      )}
    </Box>
  )
}
