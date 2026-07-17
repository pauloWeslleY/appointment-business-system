import {
  Box,
  Card,
  DataList,
  Flex,
  For,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useParams } from '@tanstack/react-router'
import { FileImage } from 'lucide-react'

import Header from '@/components/layout/header'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'

import { useGetServiceEstablishmentDetails } from '../hooks/use-get-service-establishment-details'
import { formattedDataServiceEstablishmentDetails } from '../utils/formatted-data-services-establishment'

const ServiceEstablishmentDetails = () => {
  const { serviceEstablishmentId } = useParams({
    from: '/dashboard/$establishmentId/services/_pages/$serviceEstablishmentId/info/',
  })

  const { data: serviceEstablishment } = useGetServiceEstablishmentDetails(
    serviceEstablishmentId,
  )

  const loadServiceEstablishmentInfo =
    formattedDataServiceEstablishmentDetails(serviceEstablishment)

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

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: '4', lg: '6' }}
        w="full"
      >
        <Card.Root
          variant="outline"
          rounded="xl"
          p="4"
          bg={{ base: 'white', _dark: 'gray.950/40' }}
          borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
        >
          <HStack align="center">
            <Box boxSize="48" mr="4">
              {serviceEstablishment?.imageUrl && (
                <Image
                  border="1px solid"
                  borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
                  rounded="xl"
                  h="auto"
                  w="full"
                  fit="contain"
                  src={serviceEstablishment.imageUrl}
                />
              )}
              {!serviceEstablishment?.imageUrl && (
                <Flex
                  p="2"
                  bg={{ base: 'gray.200', _dark: 'gray.800' }}
                  rounded="lg"
                  placeContent="center"
                >
                  <Icon boxSize="32">
                    <FileImage />
                  </Icon>
                </Flex>
              )}
            </Box>

            <Flex flex="1">
              <DataList.Root orientation="vertical">
                <For each={loadServiceEstablishmentInfo}>
                  {(service) => (
                    <DataList.Item key={service.label}>
                      <DataList.ItemLabel>{service.label}</DataList.ItemLabel>

                      <DataList.ItemValue>{service.content}</DataList.ItemValue>
                    </DataList.Item>
                  )}
                </For>
              </DataList.Root>
            </Flex>
          </HStack>
        </Card.Root>

        <Card.Root
          variant="outline"
          rounded="xl"
          p="4"
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

          <DataList.Root orientation="vertical">
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
      </SimpleGrid>
    </>
  )
}

export default ServiceEstablishmentDetails
