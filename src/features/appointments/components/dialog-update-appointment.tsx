import {
  Alert,
  Button,
  CloseButton,
  DatePicker,
  Dialog,
  HStack,
  Icon,
  parseDate,
  Portal,
  Select,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { PencilLineIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { LuCalendar } from 'react-icons/lu'

import { Field } from '@/components/ui/field'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import { useUpdateAppointmentForm } from '../hooks/use-form-update-appointment'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'

interface DialogEditAppointmentProps {
  appointment: GetAppointmentByEstablishmentModel
}

const DialogEditAppointment = ({ appointment }: DialogEditAppointmentProps) => {
  const {
    form,
    errors,
    isPendingAppointment,
    loadSelectTimeAppointment,
    loadErrorAvailableHours,
    onSubmitUpdateAppointment,
  } = useUpdateAppointmentForm(appointment)

  return (
    <Dialog.Root motionPreset="slide-in-bottom" placement="center">
      <Dialog.Trigger asChild>
        <Button variant="ghost" rounded="xl" size="sm" flex="1">
          <Icon as={PencilLineIcon} boxSize="4" />
          Editar
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
              <Dialog.Title>Editar Agendamento</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="2">
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

              {loadErrorAvailableHours && (
                <Alert.Root rounded="xl" status="warning" variant="subtle">
                  <Alert.Indicator />
                  <Alert.Title>{loadErrorAvailableHours}</Alert.Title>
                </Alert.Root>
              )}
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
