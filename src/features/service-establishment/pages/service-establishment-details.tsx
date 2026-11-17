import { Card, DataList, For, Stack, Text } from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import { useMemo } from 'react'

import { Status, type StatusProps } from '@/components/ui/status'
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

const serviceEstablishmentRoute = getRouteApi(
  '/_app/_authenticated/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)

const ServiceEstablishmentDetails = () => {
  const serviceEstablishment = serviceEstablishmentRoute.useLoaderData()
  const hasHistoryBookings = serviceEstablishment.appointments.length > 0

  const getDetailHistoryBookingsSummary = useMemo(() => {
    return serviceEstablishment.appointments.reduce<DetailHistoryBookingsSummary>(
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
          new Date(appointment.date) >= new Date()
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
  }, [serviceEstablishment.appointments])

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

        <DataList.Root
          orientation="vertical"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          gap="10"
          mt="4"
        >
          <For
            each={[
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
            ]}
          >
            {(item) => (
              <DataList.Item key={item.label}>
                <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                <DataList.ItemValue>
                  {item.status ? (
                    <Status value={item.status as StatusProps['value']}>
                      {item.value}
                    </Status>
                  ) : (
                    item.value
                  )}
                </DataList.ItemValue>
              </DataList.Item>
            )}
          </For>
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
  )
}

export default ServiceEstablishmentDetails
