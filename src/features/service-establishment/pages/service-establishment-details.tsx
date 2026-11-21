import { Card, Stack, Text } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'

import { cardSectionCss } from '@/theme/styles/global-styles'

import CardInfoServiceEstablishement from '../components/card-info-service-establishment'
import ServiceAppointmentsSummary from '../components/service-appointments-summary'
import HistoryBookingServiceTable from '../components/table-history-bookings-service'
import { buildServiceAppointmentsSummaryItems } from '../helpers/service-appointments-summary'

const serviceEstablishmentRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)

const ServiceEstablishmentDetails = () => {
  const serviceEstablishment = serviceEstablishmentRoute.useLoaderData()
  const hasHistoryBookings = serviceEstablishment.appointments.length > 0
  const serviceAppointmentsSummaryItems = buildServiceAppointmentsSummaryItems(
    serviceEstablishment.appointments,
  )

  return (
    <Stack gap={{ base: '2', lg: '4' }} w="full">
      <CardInfoServiceEstablishement
        serviceEstablishment={serviceEstablishment}
      />

      <Card.Root variant="outline" css={cardSectionCss}>
        <Text
          fontSize="md"
          fontWeight="medium"
          color={{ base: 'colorPalette.500', _dark: 'colorPalette.400' }}
        >
          Histórico de agendamentos do serviço
        </Text>

        <ServiceAppointmentsSummary
          serviceAppointmentsSummaryItems={serviceAppointmentsSummaryItems}
        />

        {!hasHistoryBookings && (
          <Text mt="2" fontSize="sm" color="colorPalette.500">
            Nenhum agendamento encontrado para este serviço
          </Text>
        )}

        {hasHistoryBookings && (
          <HistoryBookingServiceTable
            servicesBookings={serviceEstablishment.appointments}
          />
        )}
      </Card.Root>
    </Stack>
  )
}

export default ServiceEstablishmentDetails
