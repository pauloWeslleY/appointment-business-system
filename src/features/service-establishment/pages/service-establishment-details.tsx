import { Card, DataList, For, Stack, Text } from '@chakra-ui/react'
import { useParams } from '@tanstack/react-router'

import Header from '@/components/layout/header'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import CardInfoServiceEstablishement from '../components/card-info-service-establishment'
import { useGetServiceEstablishmentDetails } from '../hooks/use-get-service-establishment-details'

const ServiceEstablishmentDetails = () => {
  const { serviceEstablishmentId } = useParams({
    from: '/dashboard/$establishmentId/services/_pages/$serviceEstablishmentId/info/',
  })

  const { data: serviceEstablishment } = useGetServiceEstablishmentDetails(
    serviceEstablishmentId,
  )

  const servicesAppointments = serviceEstablishment?.bookings.map(
    (booking) => ({
      label: 'Data do agendamento',
      content: formattedDateAndHours(booking.date, true),
    }),
  )

  return (
    <>
      <Header.Root>
        <Header.Button />

        <div>
          <Header.Title>
            Serviço {' - '}
            <Text
              as="span"
              color={{ base: 'colorPalette.700', _dark: 'colorPalette.200' }}
              fontWeight="medium"
            >
              {serviceEstablishment?.name}
            </Text>
          </Header.Title>
          <Header.SubTitle>Informações detalhadas do serviço</Header.SubTitle>
        </div>
      </Header.Root>

      <Stack gap={{ base: '2', lg: '4' }} w="full">
        <CardInfoServiceEstablishement
          serviceEstablishment={serviceEstablishment}
        />

        <Card.Root
          variant="outline"
          rounded="xl"
          p="4"
          shadow="xs"
          bg={{ base: 'white', _dark: 'gray.950/40' }}
          borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
        >
          <Text fontSize="md" fontWeight="medium">
            Agendamentos do serviço
          </Text>

          {!servicesAppointments?.length && (
            <Text mt="2" fontSize="sm" color="colorPalette.500">
              Nenhum agendamento encontrado para este serviço
            </Text>
          )}

          <DataList.Root
            orientation="vertical"
            mt="4"
            flexDirection="row"
            flexWrap="wrap"
          >
            <For each={servicesAppointments}>
              {(service) => (
                <DataList.Item key={service.label}>
                  <DataList.ItemLabel>{service.label}</DataList.ItemLabel>
                  <DataList.ItemValue>{service.content}</DataList.ItemValue>
                </DataList.Item>
              )}
            </For>
          </DataList.Root>
        </Card.Root>
      </Stack>
    </>
  )
}

export default ServiceEstablishmentDetails
