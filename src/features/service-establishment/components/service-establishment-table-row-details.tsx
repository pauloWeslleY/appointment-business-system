import { Alert, Button, Card, Skeleton, Stack, Text } from '@chakra-ui/react'

import { cardSectionCss, skeletonCss } from '@/theme/styles/global-styles'

import { useServiceEstablishmentTableRowDetails } from '../hooks/use-service-establishment-table-row-details'
import CardInfoServiceEstablishement from './card-info-service-establishment'
import ServiceAppointmentsSummary from './service-appointments-summary'

interface ServiceEstablishmentTableRowDetailsProps {
  serviceId: string
}

export default function ServiceEstablishmentTableRowDetails({
  serviceId,
}: ServiceEstablishmentTableRowDetailsProps) {
  const {
    serviceDetails,
    isLoadingServiceDetails,
    serviceDetailsError,
    hasServiceAppointments,
    serviceAppointmentsSummaryItems,
    retryServiceDetails,
  } = useServiceEstablishmentTableRowDetails(serviceId)

  if (serviceDetailsError) {
    return (
      <Stack p={{ base: '2', md: '4' }}>
        <Alert.Root status="error" variant="surface" rounded="lg">
          <Alert.Indicator />
          <Stack align="start">
            <Alert.Title>
              Não foi possível carregar os detalhes do serviço.
            </Alert.Title>
            <Alert.Description>{serviceDetailsError.message}</Alert.Description>
            <Button
              rounded="lg"
              type="button"
              size="sm"
              variant="outline"
              onClick={retryServiceDetails}
            >
              Tentar novamente
            </Button>
          </Stack>
        </Alert.Root>
      </Stack>
    )
  }

  if (isLoadingServiceDetails) {
    return (
      <Stack
        role="status"
        aria-label="Carregando detalhes do serviço"
        gap="4"
        p={{ base: '2', md: '4' }}
      >
        <Skeleton h="32" css={skeletonCss} />
        <Skeleton h="20" css={skeletonCss} />
      </Stack>
    )
  }

  return (
    <Stack gap="4" p={{ base: '2', md: '4' }}>
      <CardInfoServiceEstablishement serviceEstablishment={serviceDetails} />

      <Card.Root variant="outline" css={cardSectionCss}>
        <Text
          fontSize="md"
          fontWeight="medium"
          color={{ base: 'colorPalette.500', _dark: 'colorPalette.400' }}
        >
          Resumo de agendamentos do serviço
        </Text>

        <ServiceAppointmentsSummary
          serviceAppointmentsSummaryItems={serviceAppointmentsSummaryItems}
        />

        {!hasServiceAppointments && (
          <Text mt="2" fontSize="sm" color="colorPalette.500">
            Nenhum agendamento encontrado para este serviço
          </Text>
        )}
      </Card.Root>
    </Stack>
  )
}
