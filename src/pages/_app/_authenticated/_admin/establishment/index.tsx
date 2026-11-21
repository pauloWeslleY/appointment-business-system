import { Alert, Box, Button, HStack, Icon } from '@chakra-ui/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { PlusIcon, Store } from 'lucide-react'

import Header from '@/components/layout/header'
import PageLoader from '@/components/page-loader'
import StatsEstablishments from '@/features/establishment/components/stats-establishments'
import { useGetEstablishmentsByOrganization } from '@/features/establishment/hooks/use-get-establishments-by-organization'
import TableEstablishmentsPage from '@/features/establishment/pages/table-establishments.page'
import { filterSearchEstablishmentSchema } from '@/features/establishment/schemas/filter-search-establishment.schema'
import { validateEstablishmentExistsRoute } from '@/features/establishment/validations/validation-establishment-exists.route'

export const Route = createFileRoute(
  '/_app/_authenticated/_admin/establishment/',
)({
  beforeLoad: ({ context }) =>
    validateEstablishmentExistsRoute(context.memberContext),
  validateSearch: filterSearchEstablishmentSchema,
  component: EstablishmentPage,
  pendingComponent: PageLoader,
  head: () => ({
    meta: [
      {
        title: 'Estabelecimentos | Agendros',
      },
    ],
  }),
})

function EstablishmentPage() {
  const search = Route.useSearch()
  const {
    filteredEstablishments,
    errorGetEstablishments,
    isLoadingGetEstablishments,
  } = useGetEstablishmentsByOrganization(
    search.q,
    search.opening,
    search.status,
  )

  if (isLoadingGetEstablishments) {
    return <PageLoader />
  }

  return (
    <Box spaceY={{ base: '4', lg: '8' }}>
      <Header.Root
        justify="space-between"
        flexDir={{ base: 'column', lg: 'row' }}
      >
        <HStack gap="2" align="center">
          <Header.Icon icon={Store} />
          <Header.Title>Estabelecimentos</Header.Title>
        </HStack>

        <Button rounded="lg" size="xs" colorPalette="brand" asChild>
          <Link to="/establishment/new">
            <Icon as={PlusIcon} boxSize="5" />
            Novo estabelecimento
          </Link>
        </Button>
      </Header.Root>

      {errorGetEstablishments && (
        <Alert.Root variant="surface" status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              Não foi possível carregar os estabelecimentos
            </Alert.Title>
            <Alert.Description>
              Erro: {errorGetEstablishments.message}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {!isLoadingGetEstablishments && !errorGetEstablishments && (
        <Box spaceY="4">
          <StatsEstablishments />
          <TableEstablishmentsPage establishments={filteredEstablishments} />
        </Box>
      )}
    </Box>
  )
}
