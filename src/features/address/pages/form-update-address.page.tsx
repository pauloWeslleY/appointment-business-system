import {
  Alert,
  Box,
  type BoxProps,
  Button,
  chakra,
  Stack,
} from '@chakra-ui/react'

import FormAddressFields from '../components/form-address-fields'
import { useFormUpdateAddress } from '../hooks/use-form-update-address'
import type { GetAddressByIdApiResponse } from '../types/address-response.api.type'

interface FormUpdateAddressPageProps extends BoxProps {
  address: GetAddressByIdApiResponse
}

const FormUpdateAddressPage = ({
  address,
  ...props
}: FormUpdateAddressPageProps) => {
  const {
    formUpdateAddress,
    updateAddressError,
    isPendingUpdateAddress,
    handleUpdateAddress,
  } = useFormUpdateAddress(address)

  return (
    <Box spaceY="2" {...props}>
      <chakra.form
        onSubmit={formUpdateAddress.handleSubmit(handleUpdateAddress)}
      >
        <Stack gap="4">
          <chakra.fieldset
            disabled={isPendingUpdateAddress}
            border="0"
            p="0"
            m="0"
            minW="0"
          >
            <FormAddressFields form={formUpdateAddress} />
          </chakra.fieldset>

          <Button
            type="submit"
            size="sm"
            rounded="xl"
            alignSelf="end"
            colorPalette="brand"
            loading={isPendingUpdateAddress}
          >
            Atualizar endereço
          </Button>
        </Stack>
      </chakra.form>

      {updateAddressError && (
        <Alert.Root status="error" variant="subtle" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>{updateAddressError.message}</Alert.Title>
        </Alert.Root>
      )}
    </Box>
  )
}

export default FormUpdateAddressPage
