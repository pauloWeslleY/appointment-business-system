import {
  Alert,
  Box,
  Button,
  Card,
  HStack,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon, Store } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import StatsEstablishments from '@/features/establishment/components/stats-establishments'
import { useGetEstablishmentsByOwner } from '@/features/establishment/hooks/use-get-esblishment-by-owner'
import ListEstablishmentPage from '@/features/establishment/pages/list-establishment.page'
import { validationEstablishmentExistsRouteHome } from '@/features/establishment/validations/validation-establishment-exists.route'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/_authenticated/establishment/')({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  beforeLoad: async () => await validationEstablishmentExistsRouteHome(),
  component: EstablishmentPage,
})

function EstablishmentPage() {
  const navigate = Route.useNavigate()
  const search = Route.useSearch()

  const {
    filteredEstablishments,
    errorEstablishments,
    isLoadingEstablishments,
  } = useGetEstablishmentsByOwner(search.q)

  return (
    <Box spaceY={{ base: '4', lg: '8' }}>
      <Header.Root justify="space-between" align="center">
        <HStack gap="2" align="center">
          <Header.Icon icon={Store} />
          <Header.Title>Estabelecimentos</Header.Title>
        </HStack>

        <Button
          rounded="xl"
          size="xs"
          variant="surface"
          colorPalette="emerald"
          onClick={() => navigate({ to: '/establishment/new' })}
        >
          <Icon as={PlusIcon} boxSize="5" />
          Novo estabelecimento
        </Button>
      </Header.Root>

      {errorEstablishments && (
        <Alert.Root status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>Erro: {errorEstablishments.message}</Alert.Title>
        </Alert.Root>
      )}

      {isLoadingEstablishments && (
        <Stack gap="2" w="full" p="2">
          <HStack width="full">
            <SkeletonCircle size="10" />
            <SkeletonText noOfLines={2} />
          </HStack>
          <Skeleton height="100px" rounded="xl" />
          <Skeleton height="100px" rounded="xl" />
          <Skeleton height="100px" rounded="xl" />
        </Stack>
      )}

      {!isLoadingEstablishments && filteredEstablishments.length === 0 && (
        <Alert.Root status="warning" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>Nenhum estabelecimento encontrado</Alert.Title>
        </Alert.Root>
      )}

      {!isLoadingEstablishments && !errorEstablishments && (
        <Box spaceY="4">
          <StatsEstablishments />

          <SearchPage w="350px" />

          <Card.Root variant="outline" css={cardSectionCss}>
            <ListEstablishmentPage establishments={filteredEstablishments} />
          </Card.Root>
        </Box>
      )}
    </Box>
  )
}
