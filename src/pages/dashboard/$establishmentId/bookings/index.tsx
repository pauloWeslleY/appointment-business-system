import { Box, Card } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { CalendarIcon } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
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
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <Header.Icon icon={CalendarIcon} />
        <Header.Title>Agendamentos</Header.Title>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <ListBookingEstablishment />
      </Card.Root>
    </Box>
  )
}
