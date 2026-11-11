import { Alert, Icon, Text } from '@chakra-ui/react'
import {
  Button,
  CloseButton,
  DatePicker,
  Dialog,
  HStack,
  parseDate,
  Portal,
  Select,
  Separator,
  Stack,
} from '@chakra-ui/react'
import { Calendar, SaveIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import {
  cardCss,
  contentCss,
  inputFieldStyles,
  menuItemCss,
} from '@/theme/styles/global-styles'

import { useUpdateAppointmentForm } from '../hooks/use-form-update-appointment'
import type { AppointmentModel } from '../types/appointment.model'
import DialogEditAppointmentInfo from './dialog-edit-appointment-info'
import FormUpdateStatusAppointment from './form-update-status-appointment'

interface DialogEditAppointmentProps {
  appointment: AppointmentModel
  open: boolean
  onOpen: (open: boolean) => void
}

const DialogEditAppointment = ({
  appointment,
  open,
  onOpen,
}: DialogEditAppointmentProps) => {
  const {
    form,
    errors,
    isPendingAppointment,
    loadSelectTimeAppointment,
    onSubmitUpdateAppointment,
    errorAvailableHours,
    isLoadingAvailableHours,
  } = useUpdateAppointmentForm(appointment)

  return (
    <Dialog.Root
      motionPreset="slide-in-bottom"
      placement="center"
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
      size="lg"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Editar Agendamento</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="4">
              <DialogEditAppointmentInfo appointment={appointment} />
              {errorAvailableHours && (
                <Alert.Root status="error">
                  <Alert.Indicator />
                  <Alert.Title>{errorAvailableHours.message}</Alert.Title>
                </Alert.Root>
              )}
              {isLoadingAvailableHours && (
                <Text role="status">Carregando horários disponíveis...</Text>
              )}

              <Stack
                aria-label="form-update-appointment"
                gap="2"
                css={cardCss}
                shadow="none"
                borderWidth="1px"
                bg="transparent"
              >
                <HStack align="stretch" flexDir={{ base: 'column', md: 'row' }}>
                  <Controller
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <Field
                        invalid={Boolean(errors.date)}
                        errorText={errors.date?.message}
                      >
                        <DatePicker.Root
                          size="sm"
                          variant="subtle"
                          locale="pt-BR"
                          invalid={Boolean(errors.date)}
                          value={field.value ? [parseDate(field.value)] : []}
                          onValueChange={(e) =>
                            field.onChange(e.value[0]?.toString() ?? '')
                          }
                        >
                          <DatePicker.Control>
                            <DatePicker.Input
                              {...inputFieldStyles}
                              placeholder="Selecione a data"
                            />
                            <DatePicker.IndicatorGroup>
                              <DatePicker.Trigger>
                                <Calendar />
                              </DatePicker.Trigger>
                            </DatePicker.IndicatorGroup>
                          </DatePicker.Control>
                          <Portal>
                            <DatePicker.Positioner>
                              <DatePicker.Content css={contentCss}>
                                <DatePicker.View view="day">
                                  <DatePicker.Header />
                                  <DatePicker.DayTable />
                                </DatePicker.View>
                                <DatePicker.View view="month">
                                  <DatePicker.Header />
                                  <DatePicker.MonthTable />
                                </DatePicker.View>
                                <DatePicker.View view="year">
                                  <DatePicker.Header />
                                  <DatePicker.YearTable />
                                </DatePicker.View>
                              </DatePicker.Content>
                            </DatePicker.Positioner>
                          </Portal>
                        </DatePicker.Root>
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="hour"
                    render={({ field }) => (
                      <Field
                        invalid={Boolean(errors.hour)}
                        errorText={errors.hour?.message}
                      >
                        <Select.Root
                          w="full"
                          size="sm"
                          variant="subtle"
                          disabled={
                            isLoadingAvailableHours ||
                            Boolean(errorAvailableHours) ||
                            loadSelectTimeAppointment.items.length === 0
                          }
                          collection={loadSelectTimeAppointment}
                          value={field.value}
                          onValueChange={(e) => field.onChange(e.value)}
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger {...inputFieldStyles}>
                              <Select.ValueText placeholder="Selecione o horário" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content css={contentCss}>
                                {loadSelectTimeAppointment.items.map((hour) => (
                                  <Select.Item
                                    key={hour.value}
                                    item={hour}
                                    {...menuItemCss}
                                  >
                                    {hour.label}
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
                </HStack>

                <Field
                  invalid={Boolean(errors.notes)}
                  errorText={errors.notes?.message}
                >
                  <InputField
                    {...form.register('notes')}
                    placeholder="Observações (opcional)"
                    w="full"
                  />
                </Field>

                <Button
                  size="xs"
                  rounded="lg"
                  colorPalette="brand"
                  alignSelf="flex-end"
                  loading={isPendingAppointment}
                  disabled={
                    isLoadingAvailableHours || Boolean(errorAvailableHours)
                  }
                  onClick={onSubmitUpdateAppointment}
                >
                  <Icon as={SaveIcon} boxSize="5" />
                  Salvar
                </Button>
              </Stack>

              <Separator
                mx="2"
                borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
              />

              <FormUpdateStatusAppointment appointment={appointment} />
            </Dialog.Body>
            <Dialog.Footer flexWrap="wrap" gap="2">
              <Dialog.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="subtle"
                  rounded="lg"
                  colorPalette="red"
                >
                  Fechar
                </Button>
              </Dialog.ActionTrigger>
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

export default DialogEditAppointment
