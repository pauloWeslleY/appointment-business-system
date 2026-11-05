import {
  Alert,
  Button,
  Card,
  chakra,
  HStack,
  Icon,
  Stack,
} from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'

import { cardSectionCss } from '@/theme/styles/global-styles'

import FormOpeningHoursFields from '../components/form-opening-hours-fields'
import { useFormUpdateOpeningHours } from '../hooks/use-form-update-opening-hours'
import type { EstablishmentOpeningHoursItemApiResponse } from '../types/opening-hours-response.api.type'

interface FormUpdateOpeningHoursPageProps {
  openingHours: EstablishmentOpeningHoursItemApiResponse
  establishmentId: string
  onCancel: () => void
  onSaved?: () => void
}

const FormUpdateOpeningHoursPage = ({
  openingHours,
  establishmentId,
  onCancel,
  onSaved,
}: FormUpdateOpeningHoursPageProps) => {
  const {
    formUpdateOpeningHours,
    handleUpdateOpeningHours,
    updateOpeningHoursError,
    isPendingUpdateOpeningHours,
  } = useFormUpdateOpeningHours(openingHours, establishmentId, onSaved)

  return (
    <Card.Root variant="outline" {...cardSectionCss}>
      <Card.Header px="0" pt="0" mb="4">
        <Card.Title>Edição de Horário de Funcionamento</Card.Title>
        <Card.Description>
          Altere o dia ou o intervalo do horário de funcionamento selecionado.
        </Card.Description>
      </Card.Header>

      <chakra.form
        onSubmit={formUpdateOpeningHours.handleSubmit(handleUpdateOpeningHours)}
      >
        <Stack gap="4">
          <chakra.fieldset
            disabled={isPendingUpdateOpeningHours}
            border="0"
            p="0"
            m="0"
            minW="0"
          >
            <FormOpeningHoursFields form={formUpdateOpeningHours} />
          </chakra.fieldset>

          <HStack justify="end" flexWrap="wrap" gap="2">
            <Button
              type="button"
              size="sm"
              rounded="xl"
              variant="ghost"
              colorPalette="red"
              disabled={isPendingUpdateOpeningHours}
              onClick={onCancel}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              size="sm"
              rounded="xl"
              colorPalette="brand"
              loading={isPendingUpdateOpeningHours}
            >
              <Icon as={SaveIcon} boxSize="5" />
              Salvar alterações
            </Button>
          </HStack>
        </Stack>
      </chakra.form>

      {updateOpeningHoursError && (
        <Alert.Root status="error" variant="subtle" rounded="xl" mt="4">
          <Alert.Indicator />
          <Alert.Title>{updateOpeningHoursError.message}</Alert.Title>
        </Alert.Root>
      )}
    </Card.Root>
  )
}

export default FormUpdateOpeningHoursPage
