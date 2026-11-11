import { Box, Grid, HStack, Stack, VStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { HomeIcon } from 'lucide-react'

import FilterDatePicker from '@/components/filter-date-picker'
import Header from '@/components/layout/header'
import DailyBookingsEstablishmentDashboard from '@/features/dashboard/components/daily-bookings-establishment-dashboard'
import RevenueEstablishmentDashboard from '@/features/dashboard/components/revenue-establishment-dashboard'
import StatsEstablishmentDashboard from '@/features/dashboard/components/stats-establishment-dashboard'
import TopClientsBookingsEstablishmentDashboard from '@/features/dashboard/components/top-clients-bookings-establishment-dashboard'
import TopServicesEstablishmentDashboard from '@/features/dashboard/components/top-services-establishment-dashboard'
import { DashboardOverviewRouteSearchSchema } from '@/features/dashboard/schemas/dashboard-overview-route-search.schema'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/overview/',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.DASHBOARD,
      action: PERMISSION_ACTIONS.READ,
    }),
  validateSearch: DashboardOverviewRouteSearchSchema,
  component: OverviewPage,
  head: () => ({
    meta: [
      {
        title: 'Dashboard | Agendros',
      },
    ],
  }),
})

function OverviewPage() {
  const overviewSearch = Route.useSearch()

  return (
    <Box spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between">
        <HStack minW="0">
          <Header.Icon icon={HomeIcon} />
          <VStack align="start" gap="0" minW="0">
            <Header.Title>Dashboard</Header.Title>
            <Header.SubTitle>
              Tenha uma visão geral e gerencie seu estabelecimento
            </Header.SubTitle>
          </VStack>
        </HStack>

        <FilterDatePicker from={overviewSearch.from} to={overviewSearch.to} />
      </Header.Root>

      <Box spaceY="4">
        <StatsEstablishmentDashboard
          from={overviewSearch.from}
          to={overviewSearch.to}
        />

        <Grid
          templateColumns={{
            base: 'minmax(0, 1fr)',
            xl: 'minmax(0, 2.25fr) minmax(0, 1fr)',
          }}
          gap="4"
        >
          <Stack gap="4" minW="0">
            <RevenueEstablishmentDashboard
              from={overviewSearch.from}
              to={overviewSearch.to}
            />

            <DailyBookingsEstablishmentDashboard
              from={overviewSearch.from}
              to={overviewSearch.to}
            />
          </Stack>

          <Stack gap="4" minW="0">
            <TopServicesEstablishmentDashboard
              from={overviewSearch.from}
              to={overviewSearch.to}
            />

            <TopClientsBookingsEstablishmentDashboard
              from={overviewSearch.from}
              to={overviewSearch.to}
            />
          </Stack>
        </Grid>
      </Box>
    </Box>
  )
}
