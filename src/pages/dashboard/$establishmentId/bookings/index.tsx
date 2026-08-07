import { Alert, Box, Card, HStack, Skeleton, Stack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { CalendarIcon } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import SearchPage from '@/components/search-page'
import FilterBookingsDate from '@/features/bookings/components/filter-bookings-date'
import FilterBookingsService from '@/features/bookings/components/filter-bookings-service'
import FilterBookingsStatus from '@/features/bookings/components/filter-bookings-status'
import StatInfoBookings from '@/features/bookings/components/stat-info-bookings'
import { useGetBookingByEstablishment } from '@/features/bookings/hooks/use-get-booking-by-establishment'
import ListBookingEstablishment from '@/features/bookings/pages/list-booking-establishment'
import { validationBookingRouteHome } from '@/features/bookings/validations/validation-booking.routes'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute('/dashboard/$establishmentId/bookings/')({
  validateSearch: z.object({
    to: z.string().optional(),
    from: z.string().optional(),
    status: z.string().optional(),
    service_id: z.string().optional(),
    q: z.string().optional(),
  }),
  beforeLoad: ({ search, params }) =>
    validationBookingRouteHome(search, params.establishmentId),
  component: BookingPage,
})

function BookingPage() {
  const { establishmentId } = Route.useParams()
  const search = Route.useSearch()

  const {
    data: getBookingByEstablishment = [],
    error: errorBookingByEstablishment,
    isLoading: isLoadingBookingByEstablishment,
  } = useGetBookingByEstablishment({
    establishmentId,
    from: search.from ?? '',
    to: search.to ?? '',
  })

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Icon icon={CalendarIcon} />
        <Header.Title>Agendamentos</Header.Title>
      </Header.Root>

      {errorBookingByEstablishment && (
        <Alert.Root status="error" rounded="xl" w="fit">
          <Alert.Indicator />
          <Alert.Title>{errorBookingByEstablishment.message}</Alert.Title>
        </Alert.Root>
      )}

      {isLoadingBookingByEstablishment && (
        <Stack gap="2" w="full" p="2">
          <Skeleton height="30px" rounded="xl" />
          <Skeleton height="30px" rounded="xl" />
          <Skeleton height="30px" rounded="xl" />
        </Stack>
      )}

      {!isLoadingBookingByEstablishment && !errorBookingByEstablishment && (
        <Box spaceY="4">
          <StatInfoBookings />

          <HStack>
            <SearchPage />
            <FilterBookingsDate />
            <FilterBookingsStatus />
            <FilterBookingsService />
          </HStack>

          <Card.Root variant="outline" css={cardSectionCss}>
            <ListBookingEstablishment
              bookings={getBookingByEstablishment ?? []}
            />
          </Card.Root>
        </Box>
      )}
    </Box>
  )
}
