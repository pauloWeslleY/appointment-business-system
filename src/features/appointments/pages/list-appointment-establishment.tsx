import {
  Alert,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react'
import { useParams, useSearch } from '@tanstack/react-router'

import FilterBookingsDate from '../components/filter-bookings-date'
import FilterBookingsService from '../components/filter-bookings-service'
import FilterBookingsStatus from '../components/filter-bookings-status'
import SearchBookingsClient from '../components/search-bookings-client'
import { useGetAppointmentByEstablishment } from '../hooks/use-get-appointment-by-establishment'

const ListAppointmentEstablishment = () => {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/appointments/',
  })

  const search = useSearch({
    from: '/dashboard/$establishmentId/appointments/',
  })

  const {
    data: loadBookingByEstablishment = [],
    error: errorBookingByEstablishment,
    isLoading: isLoadingBookingByEstablishment,
  } = useGetAppointmentByEstablishment({
    establishmentId,
    from: search.from ?? '',
    to: search.to ?? '',
  })

  const validateBookingByEstablishment = loadBookingByEstablishment.length > 0

  return (
    <>
      {/* Filter Bookings */}
      <HStack>
        <SearchBookingsClient />

        <FilterBookingsDate />
        <FilterBookingsStatus />
        <FilterBookingsService />
      </HStack>

      {errorBookingByEstablishment && (
        <Alert.Root status="error" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>{errorBookingByEstablishment.message}</Alert.Title>
        </Alert.Root>
      )}

      {isLoadingBookingByEstablishment && (
        <Stack gap="2" w="full" p="2">
          <HStack width="full">
            <SkeletonCircle size="10" />
            <SkeletonText noOfLines={2} />
          </HStack>
          <Skeleton height="30px" rounded="xl" />
          <Skeleton height="30px" rounded="xl" />
          <Skeleton height="30px" rounded="xl" />
        </Stack>
      )}

      {!isLoadingBookingByEstablishment && (
        <Stack gap="2" w="full" p="2">
          {validateBookingByEstablishment && (
            <>
              {loadBookingByEstablishment?.map((booking) => (
                <HStack key={booking.id} width="full">
                  <h1>{booking.date}</h1>
                  <h1>{booking.service.name}</h1>
                </HStack>
              ))}
            </>
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
    </>
  )
}

export default ListAppointmentEstablishment
