import { Box, Card, Flex, Icon } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { CalendarIcon } from 'lucide-react'
import z from 'zod'

import Header from '@/components/layout/header'
import ListAppointmentEstablishment from '@/features/appointments/pages/list-appointment-establishment'
import { validationBookingRouteHome } from '@/features/appointments/validations/validation-booking.routes'
import { cardSectionCss } from '@/theme/styles/global-styles'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/appointments/',
)({
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
        <Flex
          align="center"
          justify="center"
          boxSize="8"
          rounded="full"
          bg={{ base: 'primary.200/60', _dark: 'primary.700/80' }}
        >
          <Icon
            as={CalendarIcon}
            boxSize="5"
            color={{ base: 'primary.400', _dark: 'primary.200' }}
          />
        </Flex>

        <Header.Title>Agendamentos</Header.Title>
      </Header.Root>

      <Card.Root variant="outline" css={cardSectionCss}>
        <ListAppointmentEstablishment />
      </Card.Root>
    </Box>
  )
}
