import { Alert, Button, Card, chakra, Icon, Stack } from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'

import { cardSectionCss } from '@/theme/styles/global-styles'

import FormFieldCustomTimesOpeningHours from '../components/form-fields-custom-times-opening-hours'
import { countCustomTimesInPeriod } from '../helpers/count-custom-times-in-period'
import { useFormCustomTimesOpeningHours } from '../hooks/use-form-custom-times-opening-hours'
import type { CustomTimesOpeningHoursResponseApi } from '../types/customer-times-opening-hours.api.type'

interface FormCustomTimesOpeningHoursProps {
  openingHours: CustomTimesOpeningHoursResponseApi
}

const FormCustomTimesOpeningHours = ({
  openingHours,
}: FormCustomTimesOpeningHoursProps) => {
  const {
    errors,
    control,
    handleSubmit,
    handleCustomTimesOpeningHours,
    customTimesOpeningHoursError,
    isPendingCustomTimesOpeningHours,
  } = useFormCustomTimesOpeningHours(openingHours)
  const customTimesCapacity = countCustomTimesInPeriod(
    openingHours.open,
    openingHours.close,
  )

  return (
    <Card.Root variant="outline" {...cardSectionCss}>
      <Card.Header px="0" pt="0" mb="4">
        <Card.Title>Horários personalizados</Card.Title>
        <Card.Description>
          Este período comporta até{' '}
          {customTimesCapacity.toLocaleString('pt-BR')}{' '}
          {customTimesCapacity === 1
            ? 'horário distinto'
            : 'horários distintos'}
          .
        </Card.Description>
      </Card.Header>

      <chakra.form onSubmit={handleSubmit(handleCustomTimesOpeningHours)}>
        <Stack gap="4">
          <chakra.fieldset
            disabled={isPendingCustomTimesOpeningHours}
            border="0"
            p="0"
            m="0"
            minW="0"
          >
            <FormFieldCustomTimesOpeningHours
              customTimesCapacity={customTimesCapacity}
              control={control}
              errors={errors}
            />
          </chakra.fieldset>

          <Button
            type="submit"
            size="sm"
            rounded="lg"
            colorPalette="brand"
            alignSelf="flex-end"
            loading={isPendingCustomTimesOpeningHours}
          >
            <Icon as={SaveIcon} boxSize="5" />
            Salvar horários
          </Button>
        </Stack>
      </chakra.form>

      {customTimesOpeningHoursError && (
        <Alert.Root status="error" variant="subtle" rounded="xl" mt="4">
          <Alert.Indicator />
          <Alert.Title>{customTimesOpeningHoursError.message}</Alert.Title>
        </Alert.Root>
      )}
    </Card.Root>
  )
}

export default FormCustomTimesOpeningHours
