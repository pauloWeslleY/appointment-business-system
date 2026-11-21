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
import type { ReactElement } from 'react'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import AppointmentPeriodFilter from '@/features/appointment/components/appointment-period-filter'
import AppointmentStatusTabs from '@/features/appointment/components/appointment-status-tabs'
import AppointmentViewModeToggle from '@/features/appointment/components/appointment-view-mode-toggle'
import FilterAppointmentsService from '@/features/appointment/components/filter-appointments-service'
import PendingAppointmentsAlert from '@/features/appointment/components/pending-appointments-alert'
import SidebarCreateAppointment from '@/features/appointment/components/sidebar-create-appointment'
import { useAppointmentPage } from '@/features/appointment/hooks/use-appointment-page'
import { useAppointmentViewMode } from '@/features/appointment/hooks/use-appointment-view-mode'
import CardsAppointmentsViewMode from '@/features/appointment/pages/card-appointments-view-mode'
import ListAppointmentsViewMode from '@/features/appointment/pages/list-appointments-view-mode'
import { AppointmentRouteSearchSchema } from '@/features/appointment/schemas/appointment-route-search.schema'
import {
  AppointmentViewMode,
  type AppointmentViewModeType,
} from '@/features/appointment/types/appointment-view-mode.type'
import { validationAppointmentRouteHome } from '@/features/appointment/validations/validation-appointment.routes'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { usePermissions } from '@/shared/hooks/use-permissions'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'
import { cardSectionCss, skeletonCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/appointment/',
)({
  validateSearch: AppointmentRouteSearchSchema,
  beforeLoad: ({ context, search, params }) => {
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.APPOINTMENT,
      action: PERMISSION_ACTIONS.READ,
    })
    validationAppointmentRouteHome(search, params.slug)
  },
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
  const { appointments: appointmentPermissions } = usePermissions([
    RESOURCES.APPOINTMENT,
  ])
  const {
    appointments,
    totalAppointments,
    appointmentsSummary,
    appointmentsError,
    isLoadingAppointments,
    appointmentsScopeKey,
    pendingAppointmentsCount,
    hasPendingAppointments,
    retryAppointments,
  } = useAppointmentPage()

  const { appointmentViewMode, changeAppointmentViewMode } =
    useAppointmentViewMode()

  const RenderAppointmentViewMode: Record<
    AppointmentViewModeType,
    ReactElement
  > = {
    [AppointmentViewMode.LIST]: (
      <ListAppointmentsViewMode
        appointments={appointments}
        totalAppointments={totalAppointments}
      />
    ),
    [AppointmentViewMode.CARD]: (
      <CardsAppointmentsViewMode
        appointments={appointments}
        total={totalAppointments}
      />
    ),
  }

  return (
    <Box key={appointmentsScopeKey} spaceY={{ base: '4', lg: '6' }} pb="4">
      <Header.Root justify="space-between" align="center">
        <HStack align="center">
          <Header.Icon icon={CalendarIcon} />
          <Header.Title>Agendamentos</Header.Title>
        </HStack>

        <Flex gap="4" align="center">
          {appointmentPermissions.canCreate && <SidebarCreateAppointment />}

          <AppointmentViewModeToggle
            appointmentViewMode={appointmentViewMode}
            onAppointmentViewModeChange={changeAppointmentViewMode}
          />
        </Flex>
      </Header.Root>

      <Box spaceY="4">
        <Card.Root variant="outline" css={cardSectionCss}>
          <Stack gap="4">
            <Flex align="center" gap="2" flexWrap="wrap">
              <SearchPage resetPagination flex="1" />
              <FilterAppointmentsService />
            </Flex>

            <AppointmentPeriodFilter
              from={appointmentSearch.from}
              to={appointmentSearch.to}
            />
          </Stack>
        </Card.Root>

        {appointmentsSummary && (
          <AppointmentStatusTabs appointmentsSummary={appointmentsSummary} />
        )}

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
              {(item) => <Skeleton key={item} h="60px" {...skeletonCss} />}
            </For>
          </Stack>
        )}

        {!isLoadingAppointments && !appointmentsError && (
          <Box spaceY="4">
            {hasPendingAppointments && (
              <PendingAppointmentsAlert
                pendingAppointmentsCount={pendingAppointmentsCount}
              />
            )}

            {RenderAppointmentViewMode[appointmentViewMode]}
          </Box>
        )}
      </Box>
    </Box>
  )
}
