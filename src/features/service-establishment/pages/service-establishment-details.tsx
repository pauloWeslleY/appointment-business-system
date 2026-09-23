import { Box, Card, HStack, Separator, Stack, Text } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { Info } from 'lucide-react'
import { useMemo } from 'react'

import Header from '@/components/layout/header'
import { Status } from '@/components/ui/status'
import { BookingStatus } from '@/features/bookings/types/booking-status.type'
import { cardSectionCss } from '@/theme/styles/global-styles'

import CardInfoServiceEstablishement from '../components/card-info-service-establishment'
import HistoryBookingServiceTable from '../components/table-history-bookings-service'

const serviceEstablishmentRoute = getRouteApi(
  '/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)

const ServiceEstablishmentDetails = () => {
  const serviceEstablishment = serviceEstablishmentRoute.useLoaderData()
  const hasHistoryBookings = serviceEstablishment?.bookings.length > 0

  const getDetailHistoryBookingsSummary = useMemo(() => {
    const now = new Date()

    return serviceEstablishment.bookings.reduce(
      (summary, booking) => {
        summary.all += 1

        if (booking.status === BookingStatus.CONCLUDED) {
          summary.concluded += 1
        }

        if (booking.status === BookingStatus.CANCELLED) {
          summary.cancelled += 1
        }

        if (
          booking.status === BookingStatus.CONFIRMED &&
          new Date(booking.date) >= now
        ) {
          summary.upcoming += 1
        }

        return summary
      },
      {
        all: 0,
        upcoming: 0,
        concluded: 0,
        cancelled: 0,
      },
    )
  }, [serviceEstablishment.bookings])

  return (
    <Box spaceY="4" w="full">
      <Header.Root>
        <Header.Button />

        <HStack gap="2" align="center">
          <Header.Icon icon={Info} />

          <Header.Title fontWeight="semibold" letterSpacing="wider">
            Serviço {' - '}
            <Text
              as="span"
              color={{ base: 'primary.700', _dark: 'primary.200' }}
              fontWeight="light"
              letterSpacing="tight"
            >
              {serviceEstablishment.name}
            </Text>
          </Header.Title>
        </HStack>
      </Header.Root>

      <Stack gap={{ base: '2', lg: '4' }} w="full">
        <CardInfoServiceEstablishement
          serviceEstablishment={serviceEstablishment}
        />

        <Card.Root variant="outline" css={cardSectionCss}>
          <Text fontSize="md" fontWeight="medium">
            Histórico de agendamentos do serviço
          </Text>

          <HStack mt="4" gap="4">
            <Text fontWeight="medium" fontSize="sm">
              {getDetailHistoryBookingsSummary.all} Todos
            </Text>

            <Separator orientation="vertical" height="4" />

            <Status value="error">
              {getDetailHistoryBookingsSummary.cancelled} Cancelado
            </Status>
            <Status value="info">
              {getDetailHistoryBookingsSummary.upcoming} Próximos
            </Status>
            <Status value="success">
              {getDetailHistoryBookingsSummary.concluded} Concluídos
            </Status>
          </HStack>

          {!hasHistoryBookings && (
            <Text mt="2" fontSize="sm" color="colorPalette.500">
              Nenhum agendamento encontrado para este serviço
            </Text>
          )}

          {hasHistoryBookings && (
            <HistoryBookingServiceTable
              servicesBookings={serviceEstablishment.bookings}
            />
          )}
        </Card.Root>
      </Stack>
    </Box>
  )
}

export default ServiceEstablishmentDetails
