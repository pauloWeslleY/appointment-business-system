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
import { getBadgeBookingColor } from '@/features/bookings/constants/get-badge-booking-color'
import { bookingStatusLabel } from '@/features/bookings/types/booking-status.type'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import type { ServiceEstablishmentDetailsModel } from '../types/service-establishment-details.model'

interface HistoryBookingServiceTableProps {
  servicesBookings: ServiceEstablishmentDetailsModel['bookings']
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
      servicesBookings.map((booking) => ({
        id: booking.id,
        date: formattedDateAndHours(booking.date, true),
        status: booking.status,
        client: booking.user.name,
        observations: booking.notes ?? '-',
      })),
    [servicesBookings],
  )

  const visibleBookings = useMemo(() => {
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
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row bg="transparent">
              <Table.ColumnHeader>Data e Horário</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Cliente</Table.ColumnHeader>
              <Table.ColumnHeader>Observações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {visibleBookings.map((booking) => (
              <Table.Row key={booking.id} bg="transparent">
                <Table.Cell>{booking.date}</Table.Cell>
                <Table.Cell>
                  <Badge
                    colorPalette={getBadgeBookingColor[booking.status]}
                    w="fit-content"
                  >
                    {bookingStatusLabel[booking.status]}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{booking.client}</Table.Cell>
                <Table.Cell>{booking.observations}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justify="space-between"
        w="full"
      >
        <Flex flexDir={{ base: 'column', md: 'row' }} align="center" gap="2">
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
            {`Exibindo ${visibleBookings.length} de ${historyBookingServices.length} agendamentos`}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default HistoryBookingServiceTable
