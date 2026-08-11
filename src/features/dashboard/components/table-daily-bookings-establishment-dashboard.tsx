import { Badge, Box, Table } from '@chakra-ui/react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import { getBadgeBookingColor } from '@/features/bookings/constants/get-badge-booking-color'
import { bookingStatusLabel } from '@/features/bookings/types/booking-status.type'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import type { DailyBookingsEstablishmentModel } from '../types/daily-bookings-establishment.model'

interface TableDailyBookingsEstablishmentDashboardProps {
  bookings: DailyBookingsEstablishmentModel[]
}

const TableDailyBookingsEstablishmentDashboard = ({
  bookings,
}: TableDailyBookingsEstablishmentDashboardProps) => {
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(5),
    },
    {
      shallow: true,
    },
  )

  const getTableDailyBookingsEstablishmentDashboard = useMemo(() => {
    const start = (pagination.page - 1) * pagination.page_size
    const end = start + pagination.page_size
    return bookings.slice(start, end)
  }, [bookings, pagination.page, pagination.page_size])

  return (
    <Box spaceY="2">
      <Table.Root size="sm" variant="line" borderRadius="lg" overflow="hidden">
        <Table.Header>
          <Table.Row bg="transparent">
            <Table.ColumnHeader>Cliente</Table.ColumnHeader>
            <Table.ColumnHeader>Data</Table.ColumnHeader>
            <Table.ColumnHeader>Serviço</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getTableDailyBookingsEstablishmentDashboard.map((booking) => (
            <Table.Row key={booking.id} bg="transparent">
              <Table.Cell>{booking.user}</Table.Cell>
              <Table.Cell>
                {formattedDateAndHours(booking.dateBooking, true)}
              </Table.Cell>
              <Table.Cell>{booking.service}</Table.Cell>
              <Table.Cell>
                <Badge
                  colorPalette={getBadgeBookingColor[booking.status]}
                  w="fit-content"
                >
                  {bookingStatusLabel[booking.status]}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <PaginationTable
        count={bookings.length}
        pageSize={pagination.page_size}
        page={pagination.page}
        onPageChange={(details) =>
          setPagination({ page: details.page, page_size: details.pageSize })
        }
      />
    </Box>
  )
}

export default TableDailyBookingsEstablishmentDashboard
