import {
  Badge,
  Box,
  Flex,
  type PaginationPageChangeDetails,
  Spinner,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import SelectPageSize from '@/components/layout/select-page-size'
import { getBadgeAppointmentColor } from '@/features/appointment/constants/get-badge-appointment-color'
import { appointmentStatusLabel } from '@/features/appointment/types/appointment-status.type'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import type { ServiceEstablishmentDetailsModel } from '../types/service-establishment-details.model'

interface HistoryBookingServiceTableProps {
  servicesBookings: ServiceEstablishmentDetailsModel['appointments']
}

const HistoryBookingServiceTable = ({
  servicesBookings,
}: HistoryBookingServiceTableProps) => {
  const [isPendingPagination, startTransition] = useTransition()
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(5).withOptions({
        clearOnDefault: false,
      }),
    },
    {
      shallow: false,
    },
  )

  const search = useSearch({
    from: '/dashboard/$slug/services/_pages/$serviceEstablishmentId/info/',
  })

  const historyBookingServices = useMemo(
    () =>
      servicesBookings.map((appointment) => ({
        id: appointment.id,
        date: formattedDateAndHours(appointment.date, true),
        status: appointment.status,
        client: appointment.user.name,
        observations: appointment.notes ?? '-',
      })),
    [servicesBookings],
  )

  const visibleAppointments = useMemo(() => {
    const start = (pagination.page - 1) * pagination.page_size
    const end = start + pagination.page_size
    return historyBookingServices.slice(start, end)
  }, [historyBookingServices, pagination.page, pagination.page_size])

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  return (
    <Box mt="4" spaceY="4">
      {isPendingPagination && (
        <VStack
          colorPalette={colorDefaultTheme}
          h="28"
          justify="center"
          align="center"
        >
          <Spinner color="colorPalette.500" />
          <Text color="colorPalette.500">Carregando dados...</Text>
        </VStack>
      )}

      {!isPendingPagination && (
        <Table.ScrollArea
          maxW="full"
          tabIndex={0}
          aria-label="Histórico de agendamentos: role para ver todas as colunas"
        >
          <Table.Root size="sm" minW="36rem">
            <Table.Header>
              <Table.Row bg="transparent">
                <Table.ColumnHeader>Data e Horário</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Cliente</Table.ColumnHeader>
                <Table.ColumnHeader>Observações</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {visibleAppointments.map((appointment) => (
                <Table.Row key={appointment.id} bg="transparent">
                  <Table.Cell>{appointment.date}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={
                        getBadgeAppointmentColor[appointment.status]
                      }
                      w="fit-content"
                    >
                      {appointmentStatusLabel[appointment.status]}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{appointment.client}</Table.Cell>
                  <Table.Cell>{appointment.observations}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      )}

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justify="space-between"
        flexWrap="wrap"
        gap="3"
        w="full"
      >
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          align="center"
          gap="2"
          flexWrap="wrap"
        >
          <PaginationTable
            count={historyBookingServices.length}
            pageSize={pagination.page_size}
            page={pagination.page}
            onPageChange={handlePageChange}
          />

          <SelectPageSize
            pages={[5, 10, 20]}
            search={{
              page: search.page,
              pageSize: search.page_size,
            }}
          />
        </Flex>

        <Box
          textAlign={{ base: 'center', md: 'right' }}
          mt={{ base: '2', md: '0' }}
        >
          <Text fontSize="sm" color="gray.400">
            {`Exibindo ${visibleAppointments.length} de ${historyBookingServices.length} agendamentos`}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default HistoryBookingServiceTable
