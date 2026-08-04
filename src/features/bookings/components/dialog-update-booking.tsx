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
import { Calendar } from 'lucide-react'
import { Controller } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { cardCss, contentCss } from '@/theme/styles/global-styles'

import { useUpdateBookingForm } from '../hooks/use-form-update-booking'
import type { GetBookingByEstablishmentModel } from '../types/get-booking-by-establishment.model'
import DialogEditBookingInfo from './dialog-edit-booking-info'
import FormUpdateStatusBooking from './form-update-status-booking'

interface DialogEditBookingProps {
  booking: GetBookingByEstablishmentModel
  open: boolean
  onOpen: (open: boolean) => void
}

const DialogEditBooking = ({
  booking,
  open,
  onOpen,
}: DialogEditBookingProps) => {
  const {
    form,
    errors,
    isPendingBooking,
    loadSelectTimeBooking,
    onSubmitUpdateBooking,
  } = useUpdateBookingForm(booking)

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
              <DialogEditBookingInfo booking={booking} />

              <Stack
                aria-label="form-update-booking"
                gap="2"
                css={cardCss}
                borderWidth="1px"
                bg={{ base: 'tertiary.200', _dark: 'secondary.900/20' }}
              >
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
                          disabled={loadSelectTimeBooking.items.length === 0}
                          collection={loadSelectTimeBooking}
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
                              <Select.Content css={contentCss}>
                                {loadSelectTimeBooking.items.map((hour) => (
                                  <Select.Item
                                    key={hour.value}
                                    item={hour}
                                    rounded="xl"
                                    cursor="pointer"
                                    _hover={{
                                      bg: {
                                        base: 'gray.100',
                                        _dark: 'secondary.600',
                                      },
                                    }}
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
                  size="sm"
                  variant="subtle"
                  rounded="xl"
                  colorPalette="primary"
                  alignSelf="flex-end"
                  loading={isPendingBooking}
                  loadingText="Salvando..."
                  onClick={onSubmitUpdateBooking}
                >
                  Salvar
                </Button>
              </Stack>

              <Separator
                mx="6"
                borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
              />

              <FormUpdateStatusBooking booking={booking} />
            </Dialog.Body>
            <Dialog.Footer>
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

export default DialogEditBooking
