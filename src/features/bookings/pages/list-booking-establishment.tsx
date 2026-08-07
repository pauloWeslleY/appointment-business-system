import { Alert, SimpleGrid, Stack } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'

import CardBooking from '../components/card-booking'
import type { GetBookingByEstablishmentModel } from '../types/get-booking-by-establishment.model'

interface ListBookingEstablishmentProps {
  bookings: GetBookingByEstablishmentModel[]
}

const ListBookingEstablishment = ({
  bookings,
}: ListBookingEstablishmentProps) => {
  const search = useSearch({
    from: '/dashboard/$establishmentId/bookings/',
  })

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

  return (
    <Stack gap="2" w="full">
      {bookings.length > 0 && (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="4" w="full">
          {filteredBookingByEstablishment.map((booking) => (
            <CardBooking key={booking.id} booking={booking} />
          ))}
        </SimpleGrid>
      )}

      {bookings.length === 0 && (
        <Alert.Root status="info" rounded="xl" w="fit-content">
          <Alert.Indicator />
          <Alert.Title>
            Não há agendamentos para o período selecionado
          </Alert.Title>
        </Alert.Root>
      )}
    </Stack>
  )
}

export default ListBookingEstablishment
