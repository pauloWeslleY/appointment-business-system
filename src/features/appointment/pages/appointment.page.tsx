import { Alert, Box, Card, HStack, Skeleton, Stack } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { CalendarIcon } from 'lucide-react'

import FilterDatePicker from '@/components/filter-date-picker'
import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterAppointmentsService from '@/features/appointment/components/filter-appointments-service'
import FilterAppointmentsStatus from '@/features/appointment/components/filter-appointments-status'
import SidebarCreateAppointment from '@/features/appointment/components/sidebar-create-appointment'
import StatInfoAppointments from '@/features/appointment/components/stat-info-appointments'
import { useAppointmentPage } from '@/features/appointment/hooks/use-appointment-page'
import ListAppointmentEstablishment from '@/features/appointment/pages/list-appointment-establishment'
import { RESOURCES } from '@/shared/constants/permission'
import { usePermissions } from '@/shared/hooks/use-permissions'
import { cardSectionCss } from '@/theme/styles/global-styles'

const pageRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug/appointment/',
)

const appointmentPermissionResources = [RESOURCES.APPOINTMENT]

export default function AppointmentPage() {
  const search = pageRoute.useSearch()
  const { appointments: appointmentPermissions } = usePermissions(
    appointmentPermissionResources,
  )

  const {
    data: getAppointmentByEstablishment,
    error: errorAppointmentByEstablishment,
    isLoading: isLoadingAppointmentByEstablishment,
  } = useAppointmentPage()

  return (
    <Box spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between" align="center">
        <HStack align="center">
          <Header.Icon icon={CalendarIcon} />
          <Header.Title>Agendamentos</Header.Title>
        </HStack>

        {appointmentPermissions.canCreate && <SidebarCreateAppointment />}
      </Header.Root>

      {errorAppointmentByEstablishment && (
        <Alert.Root status="error" rounded="xl" w="fit">
          <Alert.Indicator />
          <Alert.Title>{errorAppointmentByEstablishment.message}</Alert.Title>
        </Alert.Root>
      )}

      {isLoadingAppointmentByEstablishment && (
        <Stack gap="2" w="full" p="2">
          <Skeleton height="30px" rounded="xl" />
          <Skeleton height="30px" rounded="xl" />
          <Skeleton height="30px" rounded="xl" />
        </Stack>
      )}

      <HStack flexWrap="wrap">
        <SearchPage resetPagination />
        <FilterDatePicker from={search.from} to={search.to} resetPagination />
        <FilterAppointmentsStatus />
        <FilterAppointmentsService />
      </HStack>

      {!isLoadingAppointmentByEstablishment &&
        !errorAppointmentByEstablishment && (
          <Box spaceY="4">
            {getAppointmentByEstablishment && (
              <StatInfoAppointments
                summary={getAppointmentByEstablishment.summary}
              />
            )}

            <Card.Root variant="outline" css={cardSectionCss}>
              <ListAppointmentEstablishment
                appointments={getAppointmentByEstablishment?.appointments ?? []}
                total={getAppointmentByEstablishment?.total ?? 0}
              />
            </Card.Root>
          </Box>
        )}
    </Box>
  )
}
