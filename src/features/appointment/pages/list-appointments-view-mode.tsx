import {
  Box,
  Card,
  EmptyState,
  Flex,
  For,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { CalendarIcon } from 'lucide-react'

import PaginationTable from '@/components/layout/pagination-table'
import SelectPageSize from '@/components/layout/select-page-size'
import Loader from '@/components/loader'

import AppointmentAgendaItem from '../components/appointment-agenda-item'
import { useListAppointmentViewMode } from '../hooks/use-list-appointment-view-mode'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')
const appointmentRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug/appointment/',
)

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
  const {
    appointmentDayGroups,
    appointmentsPagination,
    hasAppointments,
    changeAppointmentsPage,
    formatAppointmentsCount,
    isChangingAppointmentsPage,
  } = useListAppointmentViewMode(totalAppointments, establishment, appointments)

  if (!hasAppointments) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <CalendarIcon />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>Sem agendamentos</EmptyState.Title>
            <EmptyState.Description>
              Não há agendamentos para o período ou filtros selecionados
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
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
