import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  For,
  HStack,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
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
import { AppointmentRouteSearchSchema } from '@/features/appointment/schemas/appointment-route-search.schema'
import { validationAppointmentRouteHome } from '@/features/appointment/validations/validation-appointment.routes'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { usePermissions } from '@/shared/hooks/use-permissions'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss } from '@/theme/styles/global-styles'

const appointmentPermissionResources = [RESOURCES.APPOINTMENT]

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/appointment/',
)({
  beforeLoad: ({ context, search, params }) => {
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.APPOINTMENT,
      action: PERMISSION_ACTIONS.READ,
    })

    validationAppointmentRouteHome(search, params.slug)
  },
  validateSearch: AppointmentRouteSearchSchema,
  component: AppointmentPage,
  head: () => ({
    meta: [
      {
        title: 'Agendamentos | Agendros',
      },
    ],
  }),
})

function AppointmentPage() {
  const appointmentSearch = Route.useSearch()
  const { appointments: appointmentPermissions } = usePermissions(
    appointmentPermissionResources,
  )
  const {
    appointments,
    totalAppointments,
    appointmentsSummary,
    appointmentsError,
    isLoadingAppointments,
    retryAppointments,
    appointmentsScopeKey,
  } = useAppointmentPage()

  return (
    <Box key={appointmentsScopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between" align="center">
        <HStack align="center">
          <Header.Icon icon={CalendarIcon} />
          <Header.Title>Agendamentos</Header.Title>
        </HStack>

        {appointmentPermissions.canCreate && <SidebarCreateAppointment />}
      </Header.Root>

      <Box spaceY="4">
        <Flex align="center" gap="2" flexWrap="wrap">
          <SearchPage resetPagination />
          <FilterAppointmentsStatus />
          <FilterAppointmentsService />
          <FilterDatePicker
            from={appointmentSearch.from}
            to={appointmentSearch.to}
            resetPagination
          />
        </Flex>

        {appointmentsError && (
          <Alert.Root status="error" rounded="lg">
            <Alert.Indicator />
            <Alert.Title>{appointmentsError.message}</Alert.Title>
            <Button rounded="lg" onClick={retryAppointments} size="sm">
              Tentar novamente
            </Button>
          </Alert.Root>
        )}

        {isLoadingAppointments && (
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

        {!isLoadingAppointments && !appointmentsError && (
          <Box spaceY="4">
            {appointmentsSummary && (
              <StatInfoAppointments summary={appointmentsSummary} />
            )}

            <Card.Root variant="outline" css={cardSectionCss}>
              <ListAppointmentEstablishment
                appointments={appointments}
                total={totalAppointments}
              />
            </Card.Root>
          </Box>
        )}
      </Box>
    </Box>
  )
}
