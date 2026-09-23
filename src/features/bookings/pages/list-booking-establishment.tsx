import {
  Alert,
  Box,
  Flex,
  type PaginationPageChangeDetails,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import SelectPageSize from '@/components/layout/select-page-size'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import CardBooking from '../components/card-booking'
import type { GetBookingByEstablishmentModel } from '../types/get-booking-by-establishment.model'

interface ListBookingEstablishmentProps {
  bookings: GetBookingByEstablishmentModel[]
}

const ListBookingEstablishment = ({
  bookings,
}: ListBookingEstablishmentProps) => {
  const [isPendingPagination, startTransition] = useTransition()
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(12).withOptions({
        clearOnDefault: false,
      }),
    },
    {
      shallow: false,
    },
  )
  const search = useSearch({ from: '/dashboard/$slug/bookings/' })

  const filteredBookingByEstablishment = useMemo(() => {
    const filteredClient = (clientName: string) => {
      return search.q
        ? clientName.toLowerCase().includes(search.q.toLowerCase())
        : true
    }

    const filteredServices = (serviceId: string) => {
      return search.service_id ? search.service_id === serviceId : true
    }

    const filteredStatus = (status: string) => {
      return search.status ? search.status === status : true
    }

    return bookings.filter(
      (booking) =>
        filteredClient(booking.user.name) &&
        filteredServices(booking.service.id) &&
        filteredStatus(booking.status),
    )
  }, [bookings, search.q, search.service_id, search.status])

  const visibleBookings = useMemo(() => {
    const start = (pagination.page - 1) * pagination.page_size
    const end = start + pagination.page_size
    return filteredBookingByEstablishment.slice(start, end)
  }, [filteredBookingByEstablishment, pagination.page, pagination.page_size])

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  if (bookings.length === 0 || filteredBookingByEstablishment.length === 0) {
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
    <Box spaceY="4" w="full">
      {isPendingPagination && (
        <VStack colorPalette={colorDefaultTheme}>
          <Spinner color="colorPalette.500" />
          <Text color="colorPalette.500">Carregando dados...</Text>
        </VStack>
      )}

      {!isPendingPagination && (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="4" w="full">
          {visibleBookings.map((booking) => (
            <CardBooking key={booking.id} booking={booking} />
          ))}
        </SimpleGrid>
      )}

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justify="space-between"
        w="full"
      >
        <Flex flexDir={{ base: 'column', md: 'row' }} align="center" gap="2">
          <PaginationTable
            count={filteredBookingByEstablishment.length}
            pageSize={pagination.page_size}
            page={pagination.page}
            onPageChange={handlePageChange}
          />

          <SelectPageSize
            pages={[12, 24, 48]}
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
            {`Exibindo ${visibleBookings.length} de ${filteredBookingByEstablishment.length} agendamentos`}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default ListBookingEstablishment
