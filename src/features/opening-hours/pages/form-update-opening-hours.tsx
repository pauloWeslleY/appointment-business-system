import { Alert, Button, Card, chakra, Icon, Stack } from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'

import { cardSectionCss } from '@/theme/styles/global-styles'

import FormOpeningHoursFields from '../components/form-opening-hours-fields'
import { useFormUpdateOpeningHours } from '../hooks/use-form-update-opening-hours'
import type { CustomTimesOpeningHoursResponseApi } from '../types/customer-times-opening-hours.api.type'

interface FormUpdateOpeningHoursProps {
  openingHours: CustomTimesOpeningHoursResponseApi
}

const FormUpdateOpeningHours = ({
  openingHours,
}: FormUpdateOpeningHoursProps) => {
  const {
    formUpdateOpeningHours,
    handleUpdateOpeningHours,
    updateOpeningHoursError,
    isPendingUpdateOpeningHours,
  } = useFormUpdateOpeningHours(openingHours)

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

          <Button
            type="submit"
            size="sm"
            rounded="lg"
            colorPalette="brand"
            alignSelf="flex-end"
            loading={isPendingUpdateOpeningHours}
          >
            <Icon as={SaveIcon} boxSize="5" />
            Salvar alterações
          </Button>
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

export default FormUpdateOpeningHours
