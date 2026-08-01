import {
  Alert,
  Badge,
  Button,
  CloseButton,
  DatePicker,
  Dialog,
  HStack,
  parseDate,
  Portal,
  Select,
  Separator,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Controller } from 'react-hook-form'
import { LuCalendar } from 'react-icons/lu'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { contentCss } from '@/theme/styles/global-styles'

import { getBadgeBookingColor } from '../constants/get-badge-appointment-color'
import { useUpdateAppointmentForm } from '../hooks/use-form-update-appointment'
import { bookingStatusLabel } from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import FormUpdateStatusBooking from './form-update-status-booking'

interface DialogEditAppointmentProps {
  appointment: GetAppointmentByEstablishmentModel
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
    loadErrorAvailableHours,
    onSubmitUpdateAppointment,
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
            <Dialog.Body spaceY="2">
              <HStack alignItems="center">
                <Text
                  fontSize="sm"
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                >
                  Status:
                </Text>
                <Badge
                  colorPalette={getBadgeBookingColor[appointment.status]}
                  w="fit"
                >
                  {bookingStatusLabel[appointment.status]}
                </Badge>
              </HStack>
              <Text
                fontSize="sm"
                color={{ base: 'gray.600', _dark: 'gray.400' }}
              >
                Serviço agendado:{' '}
                {dayjs(appointment.date).format('DD/MM/YYYY [às] HH:mm')}
              </Text>

              <HStack>
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
                            rounded="xl"
                            bg={{
                              base: 'blackAlpha.100',
                              _dark: 'gray.950/40',
                            }}
                            placeholder="Selecione a data"
                          />
                          <DatePicker.IndicatorGroup>
                            <DatePicker.Trigger>
                              <LuCalendar />
                            </DatePicker.Trigger>
                          </DatePicker.IndicatorGroup>
                        </DatePicker.Control>
                        <Portal>
                          <DatePicker.Positioner>
                            <DatePicker.Content
                              borderWidth="1px"
                              bg={{ base: 'white', _dark: 'gray.900' }}
                              borderColor={{
                                base: 'gray.200',
                                _dark: 'secondary.500/20',
                              }}
                              rounded="lg"
                            >
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
                    <Select.Root
                      w="full"
                      size="sm"
                      variant="subtle"
                      disabled={loadSelectTimeAppointment.items.length === 0}
                      collection={loadSelectTimeAppointment}
                      value={field.value}
                      onValueChange={(e) => field.onChange(e.value)}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger
                          rounded="xl"
                          bg={{ base: 'blackAlpha.100', _dark: 'gray.950/40' }}
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
                            {loadSelectTimeAppointment.items.map((hour) => (
                              <Select.Item
                                item={hour}
                                key={hour.value}
                                rounded="lg"
                              >
                                {hour.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
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

              {loadErrorAvailableHours && (
                <Alert.Root rounded="xl" status="warning" variant="subtle">
                  <Alert.Indicator />
                  <Alert.Title>{loadErrorAvailableHours}</Alert.Title>
                </Alert.Root>
              )}

              <Separator
                borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
              />

              <FormUpdateStatusBooking booking={appointment} />
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
                colorPalette="primary"
                loading={isPendingAppointment}
                loadingText="Salvando..."
                onClick={onSubmitUpdateAppointment}
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

export default DialogEditAppointment
