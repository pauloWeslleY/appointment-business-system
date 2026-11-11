import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  For,
  HStack,
  Icon,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { BriefcaseBusiness, Plus } from 'lucide-react'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterServicesEstablishmentStatus from '@/features/service-establishment/components/filter-services-status'
import StatInfoServiceEstablishment from '@/features/service-establishment/components/stat-info-service-establishment'
import { useServicePage } from '@/features/service-establishment/hooks/use-service-page'
import ServicesListPage from '@/features/service-establishment/pages/services.page'
import { ServiceEstablishmentRouteSearchSchema } from '@/features/service-establishment/schemas/service-establishment-route-search.schema'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

const dashboardSlugRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/services/',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.SERVICE,
      action: PERMISSION_ACTIONS.READ,
    }),
  validateSearch: ServiceEstablishmentRouteSearchSchema,
  component: ServicesPage,
  head: () => ({
    meta: [
      {
        title: 'Serviços | Agendros',
      },
    ],
  }),
})

function ServicesPage() {
  const { establishment } = dashboardSlugRoute.useLoaderData()
  const navigateFromServicesList = Route.useNavigate()
  const {
    services,
    totalServices,
    servicesSummary,
    servicesError,
    isLoadingServices,
    retryServices,
    servicesScopeKey,
  } = useServicePage(establishment.id)

  const navigateToCreateService = () =>
    navigateFromServicesList({
      to: '/dashboard/$slug/services/new',
      params: { slug: establishment.slug },
    })

  return (
    <Box key={servicesScopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between" align="center">
        <HStack align="center">
          <Header.Icon icon={BriefcaseBusiness} />
          <Header.Title>Serviços</Header.Title>
        </HStack>

        <Button
          colorPalette="brand"
          rounded="lg"
          size="xs"
          onClick={navigateToCreateService}
        >
          <Icon as={Plus} boxSize="5" />
          Cadastrar Serviço
        </Button>
      </Header.Root>

      <Box spaceY="4">
        <Flex align="center" gap="2" flexWrap="wrap">
          <SearchPage resetPagination />
          <FilterServicesEstablishmentStatus />
        </Flex>

        {servicesError && (
          <Alert.Root status="error" rounded="lg">
            <Alert.Indicator />
            <Alert.Title>{servicesError.message}</Alert.Title>
            <Button rounded="lg" onClick={retryServices} size="sm">
              Tentar novamente
            </Button>
          </Alert.Root>
        )}

        {isLoadingServices && (
          <Stack gap="2" w="full">
            <For each={[1, 2, 3]}>
              {(item) => (
                <Skeleton
                  key={item}
                  height="60px"
                  rounded="lg"
                  bg={{ base: 'gray.200', _dark: 'gray.700/70' }}
                />
              )}
            </For>
          </Stack>
        )}

        {!isLoadingServices && !servicesError && (
          <Box spaceY="4">
            {servicesSummary && (
              <StatInfoServiceEstablishment summary={servicesSummary} />
            )}

            <Card.Root variant="outline" css={cardSectionCss}>
              <ServicesListPage services={services} total={totalServices} />
            </Card.Root>
          </Box>
        )}
      </Box>
    </Box>
  )
}
