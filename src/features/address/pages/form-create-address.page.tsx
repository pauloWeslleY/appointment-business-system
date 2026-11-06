import { Alert, Button, Card, chakra, Stack } from '@chakra-ui/react'

import { cardSectionCss } from '@/theme/styles/global-styles'

import FormAddressFields from '../components/form-address-fields'
import { useFormCreateAddress } from '../hooks/use-form-create-address'

interface FormCreateAddressPageProps {
  establishmentId?: string
  onSaved?: () => void
}

const FormCreateAddressPage = ({
  establishmentId,
  onSaved,
}: FormCreateAddressPageProps) => {
  const {
    formCreateAddress,
    handleCreateAddress,
    createAddressError,
    isPendingCreateAddress,
  } = useFormCreateAddress(establishmentId, onSaved)

  return (
    <Card.Root variant="outline" {...cardSectionCss}>
      <Card.Header px="0" pt="0" mb="4">
        <Card.Title>Cadastro de Endereço</Card.Title>
        <Card.Description>
          Dados do endereço vinculados ao estabelecimento.
        </Card.Description>
      </Card.Header>

      <chakra.form
        onSubmit={formCreateAddress.handleSubmit(handleCreateAddress)}
      >
        <Stack gap="4">
          <chakra.fieldset
            disabled={isPendingCreateAddress}
            border="0"
            p="0"
            m="0"
            minW="0"
          >
            <FormAddressFields form={formCreateAddress} />
          </chakra.fieldset>

          <Button
            type="submit"
            size="sm"
            rounded="lg"
            alignSelf="end"
            colorPalette="brand"
            loading={isPendingCreateAddress}
          >
            Cadastrar endereço
          </Button>
        </Stack>
      </chakra.form>

      {createAddressError && (
        <Alert.Root status="error" variant="subtle" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>{createAddressError.message}</Alert.Title>
        </Alert.Root>
      )}
    </Card.Root>
  )
}

export default FormCreateAddressPage
