import {
  Alert,
  Box,
  Card,
  Flex,
  For,
  HStack,
  type PaginationPageChangeDetails,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useTransition } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import SelectPageSize from '@/components/layout/select-page-size'
import Loader from '@/components/loader'

import AppointmentAgendaItem from '../components/appointment-agenda-item'
import { groupAppointmentsByDay } from '../helpers/group-appointments-by-day'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')
const appointmentRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug/appointment/',
)

const formatAppointmentsCount = (appointmentsCount: number): string => {
  const appointmentsLabel =
    appointmentsCount === 1 ? 'agendamento' : 'agendamentos'

  return `${appointmentsCount} ${appointmentsLabel}`
}

interface AppointmentsAgendaPageProps {
  appointments: GetAppointmentByEstablishmentModel[]
  totalAppointments: number
}

const ListAppointmentsViewMode = ({
  appointments,
  totalAppointments,
}: AppointmentsAgendaPageProps) => {
  const { establishment } = dashboardRoute.useLoaderData()
  const appointmentSearch = appointmentRoute.useSearch()
  const [isChangingAppointmentsPage, startAppointmentsPageTransition] =
    useTransition()
  const [appointmentsPagination, setAppointmentsPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger
        .withDefault(12)
        .withOptions({ clearOnDefault: false }),
    },
    { shallow: true },
  )

  const appointmentDayGroups = groupAppointmentsByDay(
    appointments,
    establishment.timezone,
  )
  const hasAppointments = totalAppointments > 0

  const changeAppointmentsPage = (
    pageChangeDetails: PaginationPageChangeDetails,
  ): void => {
    startAppointmentsPageTransition(() => {
      setAppointmentsPagination({
        page: pageChangeDetails.page,
        page_size: pageChangeDetails.pageSize,
      })
    })
  }

  if (!hasAppointments) {
    return (
      <Alert.Root status="info" rounded="xl" w="fit-content">
        <Alert.Indicator />
        <Alert.Title>
          Não há agendamentos para o período ou filtros selecionados
        </Alert.Title>
      </Alert.Root>
    )
  }

  return (
    <Stack gap="6" w="full">
      {isChangingAppointmentsPage && (
        <Loader h="28" message="Carregando agendamentos..." />
      )}

      {!isChangingAppointmentsPage && (
        <For
          each={appointmentDayGroups}
          fallback={<Text>Nenhum agendamento encontrado</Text>}
        >
          {(appointmentDayGroup) => (
            <Box as="section" key={appointmentDayGroup.dayKey} spaceY="3">
              <HStack gap="3" align="baseline">
                <Text as="h2" fontWeight="semibold">
                  {appointmentDayGroup.dayLabel}
                </Text>
                <Text
                  fontSize="sm"
                  color={{ _light: 'gray.500', _dark: 'gray.400' }}
                >
                  {formatAppointmentsCount(
                    appointmentDayGroup.appointments.length,
                  )}
                </Text>
              </HStack>

              <Card.Root
                variant="outline"
                overflow="hidden"
                shadow="xs"
                rounded="xl"
                borderWidth="1px"
                borderColor={{ _light: 'gray.300', _dark: 'secondary.500/20' }}
                bg={{ _light: 'slate.200/40', _dark: 'slate.900' }}
              >
                <Box as="ul" listStyleType="none">
                  <For
                    each={appointmentDayGroup.appointments}
                    fallback={<Text>Nenhum agendamento encontrado</Text>}
                  >
                    {(appointment) => (
                      <AppointmentAgendaItem
                        key={appointment.id}
                        appointment={appointment}
                      />
                    )}
                  </For>
                </Box>
              </Card.Root>
            </Box>
          )}
        </For>
      )}

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'stretch', md: 'center' }}
        gap="3"
        w="full"
      >
        <Text fontSize="sm" color={{ _light: 'gray.500', _dark: 'gray.400' }}>
          {`Exibindo ${appointments.length} de ${formatAppointmentsCount(totalAppointments)}`}
        </Text>

        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          align="center"
          gap="2"
          flexWrap="wrap"
        >
          <PaginationTable
            count={totalAppointments}
            pageSize={appointmentsPagination.page_size}
            page={appointmentsPagination.page}
            onPageChange={changeAppointmentsPage}
          />

          <SelectPageSize
            shallow
            pages={[12, 24, 48]}
            search={{
              page: appointmentSearch.page,
              pageSize: appointmentSearch.page_size,
            }}
          />
        </Flex>
      </Flex>
    </Stack>
  )
}

export default ListAppointmentsViewMode
