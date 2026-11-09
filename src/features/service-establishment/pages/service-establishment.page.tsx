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
import { getRouteApi } from '@tanstack/react-router'
import { BriefcaseBusiness, Plus } from 'lucide-react'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterServicesEstablishmentStatus from '@/features/service-establishment/components/filter-services-status'
import StatInfoServiceEstablishment from '@/features/service-establishment/components/stat-info-service-establishment'
import { useServicePage } from '@/features/service-establishment/hooks/use-service-page'
import ServicesListPage from '@/features/service-establishment/pages/services.page'
import { cardSectionCss } from '@/theme/styles/global-styles'

const pageRoute = getRouteApi('/_app/_authenticated/dashboard/$slug/services/')

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export default function ServicesPage() {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const navigate = pageRoute.useNavigate()

  const {
    data: serviceEstablishments,
    isLoading: isLoadingServicesEstablishment,
    error: errorServicesEstablishment,
  } = useServicePage(establishment.id)

  return (
    <Box spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between">
        <HStack gap="2" align="center">
          <Header.Icon icon={BriefcaseBusiness} />
          <Header.Title>Serviços</Header.Title>
        </HStack>

        <Button
          colorPalette="brand"
          rounded="lg"
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

      <Flex gap="2" align="center" flexWrap="wrap">
        <SearchPage resetPagination />
        <FilterServicesEstablishmentStatus />
      </Flex>

      {!isLoadingServicesEstablishment && !errorServicesEstablishment && (
        <Box spaceY="4">
          {serviceEstablishments && (
            <StatInfoServiceEstablishment
              summary={serviceEstablishments.summary}
            />
          )}

          <Card.Root variant="outline" css={cardSectionCss}>
            <ServicesListPage
              services={serviceEstablishments?.services ?? []}
              total={serviceEstablishments?.total ?? 0}
            />
          </Card.Root>
        </Box>
      )}
    </Box>
  )
}
