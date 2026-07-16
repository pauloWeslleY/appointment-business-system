import {
  Alert,
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import dayjs from 'dayjs'
import z from 'zod'

import Header from '@/components/layout/header'
import { useGetBookingByEstablishment } from '@/shared/hooks/use-get-booking-by-establishment'

import FilterBookingsDate from './-components/filter-bookings-date'
import FilterBookingsService from './-components/filter-bookings-service'
import FilterBookingsStatus from './-components/filter-bookings-status'
import SearchBookingsClient from './-components/search-bookings-client'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/appointments/',
)({
  validateSearch: z.object({
    to: z.string().optional(),
    from: z.string().optional(),
    status: z.string().optional(),
    service_id: z.string().optional(),
  }),
  beforeLoad: ({ search, params }) => {
    if (!search.from || !search.to) {
      const dateCurrent = dayjs()

      throw redirect({
        to: '/dashboard/$establishmentId/appointments',
        params: {
          establishmentId: params.establishmentId,
        },
        search: {
          from: dateCurrent.format('YYYY-MM-DD'),
          to: dateCurrent.add(1, 'month').format('YYYY-MM-DD'),
        },
      })
    }
  },
  component: AppointmentPage,
})

function AppointmentPage() {
  const { establishmentId } = Route.useParams()
  const search = Route.useSearch()

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

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Button />

        <div>
          <Header.Title>Agendamentos</Header.Title>
          <Header.SubTitle>
            Acompanhe os horários marcados pelos clientes
          </Header.SubTitle>
        </div>
      </Header.Root>

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
    </Box>
  )
}
