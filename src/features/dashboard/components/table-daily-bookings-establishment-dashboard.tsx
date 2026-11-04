import { Badge, Box, Table } from '@chakra-ui/react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import { dashboardAppointmentStatusLabels } from '../types/dashboard-appointment-status.type'
import type { DailyAppointmentsDashboardApiResponse } from '../types/get-daily-appointments-dashboard.api.type'

interface TableDailyBookingsEstablishmentDashboardProps {
  bookings: DailyAppointmentsDashboardApiResponse
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
                {formattedDateAndHours(booking.dateAppointment, true)}
              </Table.Cell>
              <Table.Cell>{booking.service}</Table.Cell>
              <Table.Cell>
                <Badge
                  colorPalette={dashboardAppointmentStatusLabels[booking.status].color}
                  w="fit-content"
                >
                  {dashboardAppointmentStatusLabels[booking.status].label}
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
