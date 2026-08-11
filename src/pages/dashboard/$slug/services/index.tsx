import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { BriefcaseBusiness, Plus } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterServicesEstablishmentStatus from '@/features/service-establishment/components/filter-services-status'
import StatInfoServiceEstablishment from '@/features/service-establishment/components/stat-info-service-establishment'
import { useGetServiceByEstablishment } from '@/features/service-establishment/hooks/use-get-service-by-establishment'
import ServicesListPage from '@/features/service-establishment/pages/services.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/dashboard/$slug/services/')({
  validateSearch: z.object({
    page: z.number().optional().default(1),
    page_size: z.number().optional().default(12),
    q: z.string().optional(),
    status: z.string().optional(),
  }),
  component: ServicesPage,
})

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

function ServicesPage() {
  const establishment = dashboardSlugRoute.useLoaderData()
  const navigate = Route.useNavigate()

  const {
    data: servicesEsblishment,
    isLoading: isLoadingServicesEstablishment,
    error: errorServicesEstablishment,
  } = useGetServiceByEstablishment(establishment.id)

  return (
    <Box spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between">
        <HStack gap="2" align="center">
          <Header.Icon icon={BriefcaseBusiness} />
          <Header.Title>Serviços</Header.Title>
        </HStack>

        <Button
          variant="surface"
          colorPalette="emerald"
          rounded="xl"
          size="xs"
          onClick={() =>
            navigate({
              to: '/dashboard/$slug/services/new',
              params: { slug: establishment.slug },
            })
          }
        >
          <Icon as={Plus} boxSize="5" />
          Cadastrar Serviço
        </Button>
      </Header.Root>

      {errorServicesEstablishment && (
        <Alert.Root status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>{errorServicesEstablishment.message}</Alert.Title>
        </Alert.Root>
      )}

      {isLoadingServicesEstablishment && (
        <Stack gap="2" w="full" p="2">
          <Skeleton height="50px" rounded="xl" />
          <Skeleton height="50px" rounded="xl" />
          <Skeleton height="50px" rounded="xl" />
        </Stack>
      )}

      {!isLoadingServicesEstablishment && !errorServicesEstablishment && (
        <Box spaceY="4">
          <StatInfoServiceEstablishment />

          <Flex gap="2" align="center">
            <SearchPage />
            <FilterServicesEstablishmentStatus />
          </Flex>

          <Card.Root variant="outline" css={cardSectionCss}>
            <ServicesListPage services={servicesEsblishment ?? []} />
          </Card.Root>
        </Box>
      )}
    </Box>
  )
}
