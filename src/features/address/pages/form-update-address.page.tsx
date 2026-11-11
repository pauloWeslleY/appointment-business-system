import {
  Alert,
  Box,
  type BoxProps,
  Button,
  chakra,
  HStack,
  Icon,
  Stack,
} from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'

import FormAddressFields from '../components/form-address-fields'
import { useFormUpdateAddress } from '../hooks/use-form-update-address'
import type { GetAddressByIdApiResponse } from '../types/address-response.api.type'

interface FormUpdateAddressPageProps extends BoxProps {
  address: GetAddressByIdApiResponse
  onCancel?: () => void
  onSaved?: () => void
}

const FormUpdateAddressPage = ({
  address,
  onCancel,
  onSaved,
  ...props
}: FormUpdateAddressPageProps) => {
  const {
    formUpdateAddress,
    updateAddressError,
    isPendingUpdateAddress,
    handleUpdateAddress,
  } = useFormUpdateAddress(address, onSaved)

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

          <HStack justify="end" flexWrap="wrap" gap="2">
            {onCancel && (
              <Button
                type="button"
                size="sm"
                rounded="lg"
                variant="ghost"
                colorPalette="red"
                disabled={isPendingUpdateAddress}
                onClick={onCancel}
              >
                Cancelar
              </Button>
            )}

            <Button
              type="submit"
              size="sm"
              rounded="lg"
              colorPalette="brand"
              loading={isPendingUpdateAddress}
            >
              <Icon as={SaveIcon} boxSize="5" />
              Salvar
            </Button>
          </HStack>
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
