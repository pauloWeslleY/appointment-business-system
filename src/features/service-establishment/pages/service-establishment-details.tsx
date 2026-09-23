import { Box, Card, DataList, HStack, Stack, Text } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { Info } from 'lucide-react'
import { useMemo } from 'react'

import Header from '@/components/layout/header'
import { Status } from '@/components/ui/status'
import { BookingStatus } from '@/features/bookings/types/booking-status.type'
import { formatCurrencyInCents } from '@/shared/utils/formatted-price'
import { cardSectionCss } from '@/theme/styles/global-styles'

import CardInfoServiceEstablishement from '../components/card-info-service-establishment'
import HistoryBookingServiceTable from '../components/table-history-bookings-service'

interface DetailHistoryBookingsSummary {
  all: number
  upcoming: number
  concluded: number
  cancelled: number
}

const serviceEstablishmentRoute = getRouteApi(
  '/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)

const ServiceEstablishmentDetails = () => {
  const serviceEstablishment = serviceEstablishmentRoute.useLoaderData()
  const hasHistoryBookings = serviceEstablishment.bookings.length > 0

  const { getDetailHistoryBookingsSummary, totalAmountBookings } =
    useMemo(() => {
      const now = new Date()
      const totalBookingsConcluded = serviceEstablishment.bookings.filter(
        (booking) => booking.status === BookingStatus.CONCLUDED,
      )
      const totalAmountBookings =
        serviceEstablishment.servicePriceInCents * totalBookingsConcluded.length

      const getDetailHistoryBookingsSummary =
        serviceEstablishment.bookings.reduce<DetailHistoryBookingsSummary>(
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

      return {
        totalAmountBookings: formatCurrencyInCents(totalAmountBookings),
        getDetailHistoryBookingsSummary,
      }
    }, [
      serviceEstablishment.bookings,
      serviceEstablishment.servicePriceInCents,
    ])

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
          <Text
            fontSize="md"
            fontWeight="medium"
            color={{ base: 'colorPalette.500', _dark: 'colorPalette.400' }}
          >
            Histórico de agendamentos do serviço
          </Text>

          <DataList.Root
            orientation="vertical"
            display="flex"
            flexDirection="row"
            gap="10"
            mt="4"
          >
            <DataList.Item>
              <DataList.ItemLabel>
                Total faturado em agendamentos concluídos
              </DataList.ItemLabel>
              <DataList.ItemValue>{totalAmountBookings}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Total de agendamentos</DataList.ItemLabel>
              <DataList.ItemValue>
                {getDetailHistoryBookingsSummary.all}
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Agendamentos concluídos</DataList.ItemLabel>
              <DataList.ItemValue>
                <Status value="success">
                  {getDetailHistoryBookingsSummary.concluded}
                </Status>
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Agendamentos cancelados</DataList.ItemLabel>
              <DataList.ItemValue>
                <Status value="error">
                  {getDetailHistoryBookingsSummary.cancelled}
                </Status>
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Próximos agendamentos</DataList.ItemLabel>
              <DataList.ItemValue>
                <Status value="info">
                  {getDetailHistoryBookingsSummary.upcoming}
                </Status>
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>

          {/* <Text fontSize="sm">
            Total faturado em agendamentos concluídos: {totalAmountBookings}
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
          </HStack> */}

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
