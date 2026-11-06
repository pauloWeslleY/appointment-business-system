import { Alert, Button, Card, chakra, Stack } from '@chakra-ui/react'

import { cardSectionCss } from '@/theme/styles/global-styles'

import FormOpeningHoursFields from '../components/form-opening-hours-fields'
import { useFormCreateOpeningHours } from '../hooks/use-form-create-opening-hours'

interface FormCreateOpeningHoursPageProps {
  establishmentId?: string
  onSaved?: () => void
}

const FormCreateOpeningHoursPage = ({
  establishmentId,
  onSaved,
}: FormCreateOpeningHoursPageProps) => {
  const {
    formCreateOpeningHours,
    handleCreateOpeningHours,
    createOpeningHoursError,
    isPendingCreateOpeningHours,
  } = useFormCreateOpeningHours(establishmentId, onSaved)

  return (
    <Card.Root variant="outline" {...cardSectionCss}>
      <Card.Header px="0" pt="0" mb="4">
        <Card.Title>Cadastro de Horário de Funcionamento</Card.Title>
        <Card.Description>
          Dados do horário de funcionamento vinculados ao estabelecimento.
        </Card.Description>
      </Card.Header>

      <chakra.form
        onSubmit={formCreateOpeningHours.handleSubmit(handleCreateOpeningHours)}
      >
        <Stack gap="4">
          <chakra.fieldset
            disabled={isPendingCreateOpeningHours}
            border="0"
            p="0"
            m="0"
            minW="0"
          >
            <FormOpeningHoursFields form={formCreateOpeningHours} />
          </chakra.fieldset>

          <Button
            type="submit"
            size="sm"
            rounded="lg"
            alignSelf="end"
            colorPalette="brand"
            loading={isPendingCreateOpeningHours}
          >
            Cadastrar horário de funcionamento
          </Button>
        </Stack>
      </chakra.form>

      {createOpeningHoursError && (
        <Alert.Root status="error" variant="subtle" rounded="xl" mt="4">
          <Alert.Indicator />
          <Alert.Title>{createOpeningHoursError.message}</Alert.Title>
        </Alert.Root>
      )}
    </Card.Root>
  )
}

export default FormCreateOpeningHoursPage
