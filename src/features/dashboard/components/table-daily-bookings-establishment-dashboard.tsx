import { Badge, Box, chakra, For, Table } from '@chakra-ui/react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import { dashboardAppointmentStatusLabels } from '../types/dashboard-appointment-status.type'
import type { DailyAppointmentsDashboardApiResponse } from '../types/get-daily-appointments-dashboard.api.type'

interface TableDailyBookingsEstablishmentDashboardProps {
  bookings: DailyAppointmentsDashboardApiResponse
}

const TableCell = chakra(Table.Cell, {
  base: {
    borderBottomColor: { _light: 'slate.200', _dark: 'slate.500/20' },
  },
})

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
      <Table.ScrollArea
        maxW="full"
        tabIndex={0}
        aria-label="Agendamentos do dia: role para ver todas as colunas"
      >
        <Table.Root size="sm" variant="line" minW="32rem">
          <Table.Header>
            <Table.Row bg="transparent">
              <For each={['Cliente', 'Data', 'Serviço', 'Status']}>
                {(header) => (
                  <Table.ColumnHeader
                    color={{ _light: 'sea.600', _dark: 'sea.500' }}
                    borderBottomColor={{
                      _light: 'slate.200',
                      _dark: 'slate.500/20',
                    }}
                  >
                    {header}
                  </Table.ColumnHeader>
                )}
              </For>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {getTableDailyBookingsEstablishmentDashboard.map((booking) => (
              <Table.Row key={booking.id} bg="transparent">
                <TableCell>{booking.user}</TableCell>
                <TableCell>
                  {formattedDateAndHours(booking.dateAppointment, true)}
                </TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>
                  <Badge
                    colorPalette={
                      dashboardAppointmentStatusLabels[booking.status].color
                    }
                    w="fit-content"
                  >
                    {dashboardAppointmentStatusLabels[booking.status].label}
                  </Badge>
                </TableCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

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
