import { Button, Stack, Text } from '@chakra-ui/react'

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

  if (isLoading || !establishment || !address) {
    return <Loader h="28" message="Carregando endereço..." />
  }

  if (errorEstablishment || errorAddress) {
    return (
      <Stack>
        <Text role="alert">
          Não foi possível carregar o estabelecimento:{' '}
          {errorEstablishment?.message}
          {errorAddress && (
            <>
              <br />
              Não foi possível carregar o endereço: {errorAddress.message}
            </>
          )}
        </Text>
        <Button rounded="lg" onClick={retryEstablishment}>
          Tentar novamente
        </Button>
        {errorAddress && (
          <Button rounded="lg" onClick={retryAddress}>
            Tentar novamente
          </Button>
        )}
      </Stack>
    )
  }

  return <FormUpdateAddressPage address={address} mt="4" />
}

export default FormUpdateEstablishmentAddressPage
