import { Button, Flex, Spinner, Stack, Text } from '@chakra-ui/react'

import FormUpdateAddressPage from '@/features/address/pages/form-update-address.page'

import { useEstablishmentAddress } from '../hooks/use-establishment-address'

const FormUpdateEstablishmentAddressPage = () => {
  const {
    establishment,
    errorEstablishment,
    errorAddress,
    address,
    isLoading,
    retryAddress,
    retryEstablishment,
  } = useEstablishmentAddress()

  if (isLoading || !establishment || !address) {
    return (
      <Flex gap="2">
        <Spinner aria-label="Carregando estabelecimento" />
        <Text>Carregando endereço...</Text>
      </Flex>
    )
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
        <Button onClick={retryEstablishment}>Tentar novamente</Button>
        {errorAddress && (
          <Button onClick={retryAddress}>Tentar novamente</Button>
        )}
      </Stack>
    )
  }

  return <FormUpdateAddressPage address={address} mt="4" />
}

export default FormUpdateEstablishmentAddressPage
