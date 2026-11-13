import { Button, Flex, HStack, RadioCard } from '@chakra-ui/react'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { cardCss } from '@/theme/styles/global-styles'

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import { useUpdateStatusAppointmentForm } from '../hooks/use-update-status-appointment-form'
import type { AppointmentModel } from '../types/appointment.model'
import { AppointmentStatus } from '../types/appointment-status.type'
import { loadSelectStatusAppointment } from '../utils/select-appointment'

interface FormUpdateStatusAppointmentProps {
  appointment: AppointmentModel
}

const optionsStatusAppointmentConfirmedCancelled = new Set<string>([
  AppointmentStatus.CONFIRMED,
  AppointmentStatus.CANCELLED,
])

const optionsStatusAppointmentConcludedCancelled = new Set<string>([
  AppointmentStatus.CONCLUDED,
  AppointmentStatus.CANCELLED,
])

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

  const disabledUpdateStatusCancelled =
    appointment.status !== AppointmentStatus.CANCELLED

  const loadRadioOptionsStatusAppointment = loadSelectStatusAppointment.filter(
    (item) =>
      item.value === appointment.status ||
      (appointment.status === AppointmentStatus.PENDING &&
        optionsStatusAppointmentConfirmedCancelled.has(item.value)) ||
      (appointment.status === AppointmentStatus.CONFIRMED &&
        optionsStatusAppointmentConcludedCancelled.has(item.value)),
  )

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
        disabled={!disabledUpdateStatusCancelled}
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

      {statusAppointmentValue[0] === 'cancelled' && (
        <Field
          label="Motivo do cancelamento"
          invalid={Boolean(form.formState.errors.cancellationReason)}
          errorText={form.formState.errors.cancellationReason?.message}
          disabled={!disabledUpdateStatusCancelled}
        >
          <InputField
            {...form.register('cancellationReason')}
            placeholder="Informe o motivo do cancelamento"
            maxLength={500}
          />
        </Field>
      )}

      {disabledUpdateStatusCancelled && (
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
      )}
    </Flex>
  )
}

export default FormUpdateStatusAppointment
