import { Box, Card, DataList, HStack, Stack, Text } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { Info } from 'lucide-react'
import { useMemo } from 'react'

import Header from '@/components/layout/header'
import { Status } from '@/components/ui/status'
import { AppointmentStatus } from '@/features/appointment/types/appointment-status.type'
import { cardSectionCss } from '@/theme/styles/global-styles'

import CardInfoServiceEstablishement from '../components/card-info-service-establishment'
import HistoryBookingServiceTable from '../components/table-history-bookings-service'

interface DetailHistoryBookingsSummary {
  all: number
  upcoming: number
  concluded: number
  cancelled: number
}

interface HistoryBookingSummaryList {
  label: string
  value: number
  status?: 'success' | 'error' | 'info'
}

const serviceEstablishmentRoute = getRouteApi(
  '/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)

const ServiceEstablishmentDetails = () => {
  const serviceEstablishment = serviceEstablishmentRoute.useLoaderData()
  const hasHistoryBookings = serviceEstablishment.appointments.length > 0

  const totalHistoryBookingsSummaryList = useMemo(() => {
    const now = new Date()
    const getDetailHistoryBookingsSummary =
      serviceEstablishment.appointments.reduce<DetailHistoryBookingsSummary>(
        (summary, appointment) => {
          summary.all += 1

          if (appointment.status === AppointmentStatus.CONCLUDED) {
            summary.concluded += 1
          }

          if (appointment.status === AppointmentStatus.CANCELLED) {
            summary.cancelled += 1
          }

          if (
            appointment.status === AppointmentStatus.CONFIRMED &&
            new Date(appointment.date) >= now
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

    const totalHistoryBookingsSummaryList: HistoryBookingSummaryList[] = [
      {
        label: 'Total de agendamentos',
        value: getDetailHistoryBookingsSummary.all,
      },
      {
        label: 'Agendamentos concluídos',
        value: getDetailHistoryBookingsSummary.concluded,
        status: 'success',
      },
      {
        label: 'Agendamentos cancelados',
        value: getDetailHistoryBookingsSummary.cancelled,
        status: 'error',
      },
      {
        label: 'Agendamentos futuros',
        value: getDetailHistoryBookingsSummary.upcoming,
        status: 'info',
      },
    ]

    return totalHistoryBookingsSummaryList
  }, [serviceEstablishment.appointments])

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
            flexWrap="wrap"
            gap="10"
            mt="4"
          >
            {totalHistoryBookingsSummaryList.map((item) => (
              <DataList.Item key={item.label}>
                <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                <DataList.ItemValue>
                  {item.status ? (
                    <Status value={item.status}>{item.value}</Status>
                  ) : (
                    item.value
                  )}
                </DataList.ItemValue>
              </DataList.Item>
            ))}
          </DataList.Root>

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
    </Box>
  )
}

export default ServiceEstablishmentDetails
