import { Alert, Box, Button, Card, Flex, HStack, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon, Store } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import PageLoader from '@/components/page-loader'
import SearchPage from '@/components/search-page'
import FilterEstablishmentOpening from '@/features/establishment/components/filter-establishment-opening'
import StatsEstablishments from '@/features/establishment/components/stats-establishments'
import { useGetEstablishmentsByOrganization } from '@/features/establishment/hooks/use-get-establishments-by-organization'
import ListEstablishmentPage from '@/features/establishment/pages/list-establishment.page'
import { validateEstablishmentExistsRoute } from '@/features/establishment/validations/validation-establishment-exists.route'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/_admin/establishment/',
)({
  pendingComponent: PageLoader,
  validateSearch: z.object({
    page: z.number().optional().default(1),
    page_size: z.number().optional().default(4),
    q: z.string().optional(),
    opening: z.coerce.string().optional(),
  }),
  beforeLoad: ({ context }) =>
    validateEstablishmentExistsRoute(context.memberContext),
  component: EstablishmentPage,
  head: () => ({
    meta: [{ title: 'Estabelecimentos | Agendros' }],
  }),
})

function EstablishmentPage() {
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  const {
    filteredEstablishments,
    errorGetEstablishments,
    isLoadingGetEstablishments,
  } = useGetEstablishmentsByOrganization(search.q, search.opening)

  if (isLoadingGetEstablishments) {
    return <PageLoader />
  }

  return (
    <Box spaceY={{ base: '4', lg: '8' }} pb="4">
      <Header.Root
        justify="space-between"
        flexDir={{ base: 'column', lg: 'row' }}
      >
        <HStack gap="2" align="center">
          <Header.Icon icon={Store} />
          <Header.Title>Estabelecimentos</Header.Title>
        </HStack>

        <Button
          rounded="lg"
          size="xs"
          colorPalette="brand"
          onClick={() => navigate({ to: '/establishment/new' })}
        >
          <Icon as={PlusIcon} boxSize="5" />
          Novo estabelecimento
        </Button>
      </Header.Root>

      {errorGetEstablishments && (
        <Alert.Root status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>Erro: {errorGetEstablishments.message}</Alert.Title>
        </Alert.Root>
      )}

      {!isLoadingGetEstablishments && filteredEstablishments.length === 0 && (
        <Alert.Root status="warning" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>Nenhum estabelecimento encontrado</Alert.Title>
        </Alert.Root>
      )}

      {!isLoadingGetEstablishments && !errorGetEstablishments && (
        <Box spaceY="4">
          <StatsEstablishments />

          <Flex gap="2" align="center" flexWrap="wrap">
            <SearchPage w={{ base: 'full', md: '350px' }} />
            <FilterEstablishmentOpening />
          </Flex>

          <Card.Root variant="outline" css={cardSectionCss}>
            <ListEstablishmentPage establishments={filteredEstablishments} />
          </Card.Root>
        </Box>
      )}
    </Box>
  )
}
