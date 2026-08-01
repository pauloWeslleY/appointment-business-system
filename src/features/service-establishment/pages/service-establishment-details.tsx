import {
  Box,
  Card,
  DataList,
  Flex,
  For,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useParams } from '@tanstack/react-router'
import { Info } from 'lucide-react'

import Header from '@/components/layout/header'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { cardSectionCss } from '@/theme/styles/global-styles'

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
    <Box spaceY="4" w="full">
      <Header.Root>
        <Header.Button />

        <HStack gap="2" align="center">
          <Flex
            align="center"
            justify="center"
            boxSize="8"
            rounded="full"
            bg={{ base: 'primary.200/60', _dark: 'primary.700/80' }}
          >
            <Icon
              as={Info}
              boxSize="4"
              color={{ base: 'primary.400', _dark: 'primary.200' }}
            />
          </Flex>

          <Header.Title fontWeight="semibold" letterSpacing="wider">
            Serviço {' - '}
            <Text
              as="span"
              color={{ base: 'primary.700', _dark: 'primary.200' }}
              fontWeight="light"
              letterSpacing="tight"
            >
              {serviceEstablishment?.name}
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
    </Box>
  )
}

export default ServiceEstablishmentDetails
