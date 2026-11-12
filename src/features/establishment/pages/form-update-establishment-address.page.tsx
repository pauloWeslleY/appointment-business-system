import { Alert, Button, EmptyState, Icon, VStack } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { MapPinIcon } from 'lucide-react'

import Loader from '@/components/loader'
import FormUpdateAddressPage from '@/features/address/pages/form-update-address.page'
import type { GetMeContextResponse } from '@/features/members/types/member-response.type'

import { useEstablishmentAddress } from '../hooks/use-establishment-address'

interface FormUpdateEstablishmentAddressPageProps {
  establishmentSlug: string
  member: Pick<GetMeContextResponse, 'user' | 'organization'>
}

const FormUpdateEstablishmentAddressPage = ({
  establishmentSlug,
  member,
}: FormUpdateEstablishmentAddressPageProps) => {
  const {
    establishment,
    errorEstablishment,
    errorAddress,
    address,
    isLoading,
    retryAddress,
    retryEstablishment,
  } = useEstablishmentAddress(establishmentSlug, member)

  if (isLoading || !establishment) {
    return <Loader h="28" message="Carregando endereço..." />
  }

  if (errorEstablishment || errorAddress) {
    return (
      <Alert.Root role="alert" rounded="lg" status="error" variant="surface">
        <Alert.Indicator />

        <Alert.Content>
          <Alert.Title>Erro ao carregar dados</Alert.Title>
          <Alert.Description>
            Não foi possível carregar os dados do estabelecimento.
            <br />
            {errorEstablishment && `Erro: ${errorEstablishment.message}`}
            <br />
            {errorAddress && `Erro: ${errorAddress.message}`}
          </Alert.Description>
        </Alert.Content>

        <Button rounded="lg" onClick={retryEstablishment}>
          Tentar novamente
        </Button>

        {errorAddress && (
          <Button rounded="lg" onClick={retryAddress}>
            Tentar novamente
          </Button>
        )}
      </Alert.Root>
    )
  }

  return address ? (
    <FormUpdateAddressPage address={address} mt="4" />
  ) : (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Icon as={MapPinIcon} color="orange.500" />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Endereço não encontrado</EmptyState.Title>
          <EmptyState.Description>
            Este estabelecimento não possui endereço cadastrado.
          </EmptyState.Description>
        </VStack>
        <Button asChild rounded="lg">
          <Link
            to="/dashboard/$slug/address"
            params={{ slug: establishmentSlug }}
          >
            Cadastrar endereço
          </Link>
        </Button>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default FormUpdateEstablishmentAddressPage
