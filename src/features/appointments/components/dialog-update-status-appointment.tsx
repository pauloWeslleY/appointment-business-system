import {
  Badge,
  Button,
  CloseButton,
  Dialog,
  HStack,
  Icon,
  Portal,
  Select,
  Text,
} from '@chakra-ui/react'
import { Sparkles } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import { useUpdateStatusAppointmentForm } from '../hooks/use-update-status-appointment-form'
import { appointmentStatusLabel } from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

interface DialogUpdateStatusAppointmentProps {
  appointment: GetAppointmentByEstablishmentModel
}

const DialogUpdateStatusAppointment = ({
  appointment,
}: DialogUpdateStatusAppointmentProps) => {
  const {
    errors,
    control,
    handleSubmit,
    onSubmitUpdateStatusAppointment,
    loadSelectStatusBookings,
    isPendingUpdateStatusAppointment,
  } = useUpdateStatusAppointmentForm(appointment)

  return (
    <Dialog.Root motionPreset="slide-in-bottom" placement="center">
      <Dialog.Trigger asChild>
        <Button variant="ghost" rounded="xl" size="sm" flex="1">
          <Icon as={Sparkles} boxSize="4" />
          Status
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content
            colorPalette={colorDefaultTheme}
            borderWidth="1px"
            bg={{ base: 'white', _dark: 'secondary.700' }}
            borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            rounded="lg"
          >
            <Dialog.Header>
              <Dialog.Title>Atualizar status do agendamento</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="2">
              <HStack alignItems="center">
                <Text>Status:</Text>
                <Badge
                  colorPalette={getBadgeAppointmentColor[appointment.status]}
                  w="fit"
                >
                  {appointmentStatusLabel[appointment.status]}
                </Badge>
              </HStack>

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Field
                    invalid={!!errors.status}
                    errorText={errors.status?.message}
                  >
                    <Select.Root
                      w="full"
                      size="sm"
                      variant="subtle"
                      collection={loadSelectStatusBookings}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger
                          rounded="xl"
                          bg={{
                            base: 'blackAlpha.100',
                            _dark: 'gray.950/40',
                          }}
                        >
                          <Select.ValueText placeholder="Selecione o horário" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content
                            borderWidth="1px"
                            borderColor={{
                              base: 'gray.200',
                              _dark: 'secondary.500/20',
                            }}
                            rounded="lg"
                          >
                            {loadSelectStatusBookings.items.map((status) => (
                              <Select.Item
                                item={status}
                                key={status.value}
                                rounded="lg"
                              >
                                {status.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Field>
                )}
              />
            </Dialog.Body>
            <Dialog.Footer gap="2">
              <Dialog.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="subtle"
                  rounded="xl"
                  colorPalette="red"
                >
                  Fechar
                </Button>
              </Dialog.ActionTrigger>

              <Button
                size="sm"
                variant="subtle"
                rounded="xl"
                colorPalette={colorDefaultTheme}
                loading={isPendingUpdateStatusAppointment}
                loadingText="Salvando..."
                onClick={handleSubmit(onSubmitUpdateStatusAppointment)}
              >
                Salvar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DialogUpdateStatusAppointment
