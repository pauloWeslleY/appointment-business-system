import { Input } from '@chakra-ui/react'
import { Box, Button, Flex, HStack, RadioCard } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'
import { cardCss } from '@/theme/styles/global-styles'

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import { useUpdateStatusAppointmentForm } from '../hooks/use-update-status-appointment-form'
import type { AppointmentModel } from '../types/appointment.model'
import { loadSelectStatusAppointment } from '../utils/select-appointment'

interface FormUpdateStatusAppointmentProps {
  appointment: AppointmentModel
}

const FormUpdateStatusAppointment = ({
  appointment,
}: FormUpdateStatusAppointmentProps) => {
  const {
    statusAppointmentValue,
    onChangeSelectStatusAppointment,
    onSubmitUpdateStatusAppointment,
    isPendingUpdateStatusAppointment,
    form,
  } = useUpdateStatusAppointmentForm(appointment)

  return (
    <Flex
      align={{ base: 'stretch', md: 'center' }}
      flexDir={{ base: 'column', md: 'row' }}
      flexWrap="wrap"
      gap="6"
      css={cardCss}
      borderWidth="1px"
      bg={{ base: 'tertiary.200', _dark: 'secondary.900/20' }}
    >
      <RadioCard.Root
        value={statusAppointmentValue[0]}
        colorPalette={getBadgeAppointmentColor[statusAppointmentValue[0]]}
        onValueChange={(e) => onChangeSelectStatusAppointment(e.value)}
      >
        <RadioCard.Label>Selecione o status</RadioCard.Label>
        <HStack align="stretch" flexWrap="wrap">
          {loadSelectStatusAppointment
            .filter(
              (item) =>
                item.value === appointment.status ||
                (appointment.status === 'pending' &&
                  ['confirmed', 'cancelled'].includes(item.value)) ||
                (appointment.status === 'confirmed' &&
                  ['concluded', 'cancelled'].includes(item.value)),
            )
            .map((appointmentStatus, index) => (
              <RadioCard.Item
                key={index}
                value={appointmentStatus.value}
                borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
                rounded="lg"
              >
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <RadioCard.ItemContent>
                    <RadioCard.ItemText>
                      {appointmentStatus.label}
                    </RadioCard.ItemText>
                  </RadioCard.ItemContent>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
            ))}
        </HStack>
      </RadioCard.Root>

      {statusAppointmentValue[0] === 'cancelled' && (
        <Field
          label="Motivo do cancelamento"
          invalid={Boolean(form.formState.errors.cancellationReason)}
          errorText={form.formState.errors.cancellationReason?.message}
        >
          <Input {...form.register('cancellationReason')} maxLength={500} />
        </Field>
      )}
      <Box mt="6">
        <Button
          size="xs"
          rounded="lg"
          colorPalette="cyan"
          variant="outline"
          loading={isPendingUpdateStatusAppointment}
          onClick={onSubmitUpdateStatusAppointment}
        >
          Atualizar status
        </Button>
      </Box>
    </Flex>
  )
}

export default FormUpdateStatusAppointment
