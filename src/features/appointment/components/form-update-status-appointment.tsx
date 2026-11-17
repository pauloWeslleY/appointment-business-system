import { Button, Flex, HStack, RadioCard } from '@chakra-ui/react'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { cardCss } from '@/theme/styles/global-styles'

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import { useUpdateStatusAppointmentForm } from '../hooks/use-update-status-appointment-form'
import type { AppointmentModel } from '../types/appointment.model'

interface FormUpdateStatusAppointmentProps {
  appointment: AppointmentModel
}

const FormUpdateStatusAppointment = ({
  appointment,
}: FormUpdateStatusAppointmentProps) => {
  const {
    errors,
    register,
    statusAppointmentValue,
    showInputCancellationReason,
    isPendingUpdateStatusAppointment,
    disabledUpdateStatusCancelled,
    loadRadioOptionsStatusAppointment,
    onChangeSelectStatusAppointment,
    onSubmitUpdateStatusAppointment,
  } = useUpdateStatusAppointmentForm(appointment)

  if (disabledUpdateStatusCancelled) {
    return null
  }

  return (
    <Flex
      align={{ base: 'stretch', md: 'center' }}
      flexDir={{ base: 'column', md: 'row' }}
      flexWrap="wrap"
      gap="4"
      css={cardCss}
      shadow="none"
      borderWidth="1px"
      bg="transparent"
    >
      <RadioCard.Root
        value={statusAppointmentValue[0]}
        colorPalette={getBadgeAppointmentColor[statusAppointmentValue[0]]}
        onValueChange={(e) => onChangeSelectStatusAppointment(e.value)}
      >
        <RadioCard.Label>Selecione o status</RadioCard.Label>
        <HStack align="stretch" flexWrap="wrap">
          {loadRadioOptionsStatusAppointment.map((appointmentStatus, index) => (
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

      {showInputCancellationReason && (
        <Field
          label="Motivo do cancelamento"
          invalid={Boolean(errors.cancellationReason)}
          errorText={errors.cancellationReason?.message}
          disabled={!disabledUpdateStatusCancelled}
        >
          <InputField
            {...register('cancellationReason')}
            placeholder="Informe o motivo do cancelamento"
            maxLength={500}
          />
        </Field>
      )}

      <Flex w="full" justify="flex-end">
        <Button
          size="xs"
          rounded="lg"
          colorPalette="primary"
          variant="subtle"
          loading={isPendingUpdateStatusAppointment}
          onClick={onSubmitUpdateStatusAppointment}
        >
          Atualizar status
        </Button>
      </Flex>
    </Flex>
  )
}

export default FormUpdateStatusAppointment
