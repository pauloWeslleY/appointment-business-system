import { Box, Grid, HStack, Stack, VStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { HomeIcon } from 'lucide-react'
import z from 'zod'

import FilterDatePicker from '@/components/filter-date-picker'
import Header from '@/components/layout/header'
import DailyBookingsEstablishmentDashboard from '@/features/dashboard/components/daily-bookings-establishment-dashboard'
import RevenueEstablishmentDashboard from '@/features/dashboard/components/revenue-establishment-dashboard'
import StatsEstablishmentDashboard from '@/features/dashboard/components/stats-establishment-dashboard'
import TopClientsBookingsEstablishmentDashboard from '@/features/dashboard/components/top-clients-bookings-establishment-dashboard'
import TopServicesEstablishmentDashboard from '@/features/dashboard/components/top-services-establishment-dashboard'

const currentDate = dayjs()

const filteredDateOverview = {
  from: currentDate.format('YYYY-MM-DD'),
  to: currentDate.add(1, 'month').format('YYYY-MM-DD'),
}

export const Route = createFileRoute('/dashboard/$establishmentId/overview/')({
  validateSearch: z.object({
    to: z.string().optional().default(filteredDateOverview.to),
    from: z.string().optional().default(filteredDateOverview.from),
  }),
  component: OverviewPage,
})

function OverviewPage() {
  const search = Route.useSearch()

  return (
    <Box spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between">
        <HStack>
          <Header.Icon icon={HomeIcon} />
          <VStack align="start" gap="0">
            <Header.Title>Dashboard</Header.Title>
            <Header.SubTitle>
              Tenha uma visão geral e gerencie seu estabelecimento
            </Header.SubTitle>
          </VStack>
        </HStack>

        <FilterDatePicker from={search.from} to={search.to} />
      </Header.Root>

      <Box spaceY="4">
        <StatsEstablishmentDashboard from={search.from} to={search.to} />

        <Grid templateColumns={{ base: '1fr', xl: '2.25fr 1fr' }} gap="4">
          <Stack gap="4">
            <RevenueEstablishmentDashboard from={search.from} to={search.to} />

            <DailyBookingsEstablishmentDashboard
              from={search.from}
              to={search.to}
            />
          </Stack>

          <Stack gap="4">
            <TopServicesEstablishmentDashboard
              from={search.from}
              to={search.to}
            />

            <TopClientsBookingsEstablishmentDashboard
              from={search.from}
              to={search.to}
            />
          </Stack>
        </Grid>
      </Box>
    </Box>
  )
}
