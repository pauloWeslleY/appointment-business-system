import { For, SimpleGrid, Stat } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'

import { bookingQueryKeys } from '../queries/booking-query-key'
import {
  BookingStatus,
  type BookingStatusType,
} from '../types/booking-status.type'
import type { GetBookingByEstablishmentModel } from '../types/get-booking-by-establishment.model'

const StatInfoBookings = () => {
  const queryClient = useQueryClient()
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/bookings/',
  })

  const search = useSearch({
    from: '/dashboard/$establishmentId/bookings/',
  })

  const getBookings = queryClient.getQueryData<
    GetBookingByEstablishmentModel[]
  >(
    bookingQueryKeys.establishment({
      establishmentId,
      from: search.from ?? '',
      to: search.to ?? '',
    }),
  )

  const getStatBookings = useMemo(() => {
    const filteredBookingByEstablishment = (status: BookingStatusType) => {
      return getBookings?.filter((service) => service.status === status)
    }

    const getTotalBookings: Record<
      BookingStatusType,
      GetBookingByEstablishmentModel[] | undefined
    > = {
      [BookingStatus.CONCLUDED]: filteredBookingByEstablishment(
        BookingStatus.CONCLUDED,
      ),
      [BookingStatus.CONFIRMED]: filteredBookingByEstablishment(
        BookingStatus.CONFIRMED,
      ),
      [BookingStatus.CANCELLED]: filteredBookingByEstablishment(
        BookingStatus.CANCELLED,
      ),
    }

    return [
      {
        title: 'Total de agendamentos',
        value: String(getBookings?.length ?? 0),
        color: 'pink',
      },
      {
        title: 'Total de agendamentos concluídos',
        value: String(getTotalBookings[BookingStatus.CONCLUDED]?.length ?? 0),
        color: 'green',
      },
      {
        title: 'Total de agendamentos confirmados',
        value: String(getTotalBookings[BookingStatus.CONFIRMED]?.length ?? 0),
        color: 'blue',
      },
      {
        title: 'Total de agendamentos cancelados',
        value: String(getTotalBookings[BookingStatus.CANCELLED]?.length ?? 0),
        color: 'red',
      },
    ]
  }, [getBookings])

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="4" w="full">
      <For each={getStatBookings}>
        {(statService) => (
          <Stat.Root
            key={statService.title}
            p="4"
            shadow="xs"
            rounded="xl"
            bg={{ base: 'white', _dark: 'gray.950/40' }}
            outlineWidth="1px"
            outlineStyle="solid"
            outlineColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            borderLeftWidth="5px"
            borderLeftColor={`${statService.color}.500`}
          >
            <Stat.Label>{statService.title}</Stat.Label>
            <Stat.ValueText>{statService.value}</Stat.ValueText>
          </Stat.Root>
        )}
      </For>
    </SimpleGrid>
  )
}

export default StatInfoBookings
