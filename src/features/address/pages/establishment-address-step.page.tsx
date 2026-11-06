import { Alert, Button, Card, Skeleton, Stack } from '@chakra-ui/react'

import { cardSectionCss } from '@/theme/styles/global-styles'

import AddressSummary from '../components/address-summary'
import { useAddressByEstablishment } from '../hooks/use-address-by-establishment'
import FormCreateAddressPage from './form-create-address.page'

interface EstablishmentAddressStepPageProps {
  establishmentId?: string
  onContinue: () => void
}

const EstablishmentAddressStepPage = ({
  establishmentId,
  onContinue,
}: EstablishmentAddressStepPageProps) => {
  const addressQuery = useAddressByEstablishment(establishmentId)
  const address = addressQuery.data ?? null

  if (addressQuery.isLoading) {
    return (
      <Stack gap="2" role="status" aria-label="Verificando endereço">
        <Skeleton height="12" rounded="xl" />
        <Skeleton height="32" rounded="xl" />
      </Stack>
    )
  }

  if (addressQuery.error) {
    return (
      <Alert.Root status="error" rounded="xl">
        <Alert.Indicator />
        <Stack>
          <Alert.Title>{addressQuery.error.message}</Alert.Title>
          <Button
            size="sm"
            rounded="lg"
            variant="outline"
            alignSelf="start"
            onClick={() => addressQuery.refetch()}
          >
            Tentar novamente
          </Button>
        </Stack>
      </Alert.Root>
    )
  }

  if (!address) {
    return (
      <FormCreateAddressPage
        establishmentId={establishmentId}
        onSaved={onContinue}
        allowSkip
      />
    )
  }

  return (
    <Card.Root variant="outline" {...cardSectionCss}>
      <Card.Header px="0" pt="0" mb="4">
        <Card.Title>Endereço já cadastrado</Card.Title>
        <Card.Description>
          Este estabelecimento já possui endereço. Você pode alterá-lo depois no
          painel do estabelecimento.
        </Card.Description>
      </Card.Header>

      <AddressSummary address={address} />

      <Button
        size="sm"
        rounded="lg"
        alignSelf="end"
        colorPalette="brand"
        mt="4"
        onClick={onContinue}
      >
        Continuar
      </Button>
    </Card.Root>
  )
}

export default EstablishmentAddressStepPage
