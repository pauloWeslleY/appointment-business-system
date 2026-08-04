import {
  Alert,
  Box,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import { useParams, useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'

import SearchPage from '@/components/search-page'

import CardBooking from '../components/card-booking'
import FilterBookingsDate from '../components/filter-bookings-date'
import FilterBookingsService from '../components/filter-bookings-service'
import FilterBookingsStatus from '../components/filter-bookings-status'
import { useGetBookingByEstablishment } from '../hooks/use-get-booking-by-establishment'

const ListBookingEstablishment = () => {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/bookings/',
  })

  const search = useSearch({
    from: '/dashboard/$establishmentId/bookings/',
  })

  const {
    data: loadBookingByEstablishment = [],
    error: errorBookingByEstablishment,
    isLoading: isLoadingBookingByEstablishment,
  } = useGetBookingByEstablishment({
    establishmentId,
    from: search.from ?? '',
    to: search.to ?? '',
  })

  const validateBookingByEstablishment = loadBookingByEstablishment.length > 0

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

    return loadBookingByEstablishment.filter(
      (booking) =>
        filteredClient(booking.user.name) &&
        filteredServices(booking.service.id) &&
        filteredStatus(booking.status),
    )
  }, [loadBookingByEstablishment, search.q, search.service_id, search.status])

  if (errorBookingByEstablishment) {
    return (
      <Alert.Root status="error" rounded="xl" w="fit">
        <Alert.Indicator />
        <Alert.Title>{errorBookingByEstablishment.message}</Alert.Title>
      </Alert.Root>
    )
  }

  return (
    <Box spaceY="2" w="full">
      {/* Filter Bookings */}
      <HStack>
        <SearchPage />

        <FilterBookingsDate />
        <FilterBookingsStatus />
        <FilterBookingsService />
      </HStack>

      {isLoadingBookingByEstablishment && (
        <Stack gap="2" w="full" p="2">
          <Skeleton height="30px" rounded="xl" />
          <Skeleton height="30px" rounded="xl" />
          <Skeleton height="30px" rounded="xl" />
        </Stack>
      )}

      {!isLoadingBookingByEstablishment && (
        <Stack gap="2" w="full" p="2">
          {validateBookingByEstablishment && (
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="4" w="full">
              {filteredBookingByEstablishment.map((booking) => (
                <CardBooking key={booking.id} booking={booking} />
              ))}
            </SimpleGrid>
          )}

          {!validateBookingByEstablishment && (
            <Alert.Root status="info" rounded="xl" w="fit-content">
              <Alert.Indicator />
              <Alert.Title>
                Não há agendamentos para o período selecionado
              </Alert.Title>
            </Alert.Root>
          )}
        </Stack>
      )}
    </Box>
  )
}

export default ListBookingEstablishment
