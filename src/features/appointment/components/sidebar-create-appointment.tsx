import {
  Alert,
  Button,
  CloseButton,
  DatePicker,
  Drawer,
  Icon,
  parseDate,
  Portal,
  SimpleGrid,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { Calendar, PlusIcon, SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import { contentCss, inputFieldStyles } from '@/theme/styles/global-styles'

import { useFormCreateAppointment } from '../hooks/use-form-create-appointment'
import ProfessionalAvailabilityAlert from './professional-availability-alert'
import SelectFieldAppointment from './select-field-appointment'

const SidebarCreateAppointment = () => {
  const [open, setOpen] = useState(false)
  const {
    form,
    errors,
    minimumDate,
    customersCollection,
    servicesCollection,
    professionalsCollection,
    hoursCollection,
    isLoadingCustomers,
    isLoadingServices,
    isLoadingProfessionals,
    isLoadingAvailableHours,
    errorLoadingOptions,
    errorAvailableHours,
    hasScheduleSelected,
    isServiceWithoutDuration,
    isCheckingProfessionalAvailability,
    isSelectedProfessionalAvailable,
    errorProfessionalAvailability,
    isPendingCreateAppointment,
    onChangeScheduleField,
    onSubmitCreateAppointment,
    onResetCreateAppointment,
  } = useFormCreateAppointment(() => setOpen(false), open)

  const hasNoAvailableHours =
    hasScheduleSelected &&
    !isLoadingAvailableHours &&
    !errorAvailableHours &&
    hoursCollection.items.length === 0

  const hoursHelperText = hasScheduleSelected
    ? undefined
    : 'Selecione o serviço e a data para ver os horários disponíveis.'

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen && isPendingCreateAppointment) {
      return
    }

    if (!isOpen) {
      onResetCreateAppointment()
    }

    setOpen(isOpen)
  }

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      size="md"
    >
      <Drawer.Trigger asChild>
        <Button rounded="lg" size="xs" colorPalette="brand">
          <Icon as={PlusIcon} boxSize="5" />
          Novo Agendamento
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Drawer.Positioner>
          <Drawer.Content css={contentCss}>
            <Drawer.Header>
              <Drawer.Title>Novo Agendamento</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body spaceY="4">
              {errorLoadingOptions && (
                <Alert.Root status="error" rounded="xl">
                  <Alert.Indicator />
                  <Alert.Title>{errorLoadingOptions.message}</Alert.Title>
                </Alert.Root>
              )}

              <Stack
                as="form"
                aria-label="form-create-appointment"
                gap="4"
                w="full"
                mt="5"
                onSubmit={onSubmitCreateAppointment}
              >
                <Controller
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <SelectFieldAppointment
                      required
                      label="Cliente"
                      placeholder="Selecione o cliente"
                      collection={customersCollection}
                      value={field.value}
                      onValueChange={field.onChange}
                      loading={isLoadingCustomers}
                      errorText={errors.customerId?.message}
                      helperText={
                        !isLoadingCustomers &&
                        customersCollection.items.length === 0
                          ? 'Nenhum cliente ativo cadastrado neste estabelecimento.'
                          : undefined
                      }
                    />
                  )}
                />

                <Controller
                  control={form.control}
                  name="serviceId"
                  render={({ field }) => (
                    <SelectFieldAppointment
                      required
                      label="Serviço"
                      placeholder="Selecione o serviço"
                      collection={servicesCollection}
                      value={field.value}
                      onValueChange={(value) =>
                        onChangeScheduleField('serviceId', value)
                      }
                      loading={isLoadingServices}
                      errorText={errors.serviceId?.message}
                      helperText={
                        !isLoadingServices &&
                        servicesCollection.items.length === 0
                          ? 'Nenhum serviço ativo cadastrado neste estabelecimento.'
                          : undefined
                      }
                    />
                  )}
                />

                <Controller
                  control={form.control}
                  name="professionalId"
                  render={({ field }) => (
                    <SelectFieldAppointment
                      clearable
                      label="Profissional"
                      placeholder="Sem profissional definido"
                      collection={professionalsCollection}
                      value={field.value}
                      onValueChange={field.onChange}
                      loading={isLoadingProfessionals}
                      errorText={errors.professionalId?.message}
                      disabled={professionalsCollection.items.length === 0}
                      helperText="Opcional."
                    />
                  )}
                />

                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                  <Controller
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <Field
                        required
                        label="Data"
                        invalid={Boolean(errors.date)}
                        errorText={errors.date?.message}
                      >
                        <DatePicker.Root
                          size="sm"
                          variant="subtle"
                          locale="pt-BR"
                          min={parseDate(minimumDate)}
                          invalid={Boolean(errors.date)}
                          value={field.value ? [parseDate(field.value)] : []}
                          onValueChange={(e) =>
                            onChangeScheduleField(
                              'date',
                              e.value[0]?.toString() ?? '',
                            )
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
                      <SelectFieldAppointment
                        required
                        label="Horário"
                        placeholder="Selecione o horário"
                        collection={hoursCollection}
                        value={field.value}
                        onValueChange={field.onChange}
                        loading={isLoadingAvailableHours}
                        disabled={
                          !hasScheduleSelected ||
                          Boolean(errorAvailableHours) ||
                          hoursCollection.items.length === 0
                        }
                        errorText={errors.hour?.message}
                        helperText={hoursHelperText}
                      />
                    )}
                  />
                </SimpleGrid>

                {errorAvailableHours && (
                  <Alert.Root status="error" rounded="xl">
                    <Alert.Indicator />
                    <Alert.Title>{errorAvailableHours.message}</Alert.Title>
                  </Alert.Root>
                )}

                <ProfessionalAvailabilityAlert
                  isServiceWithoutDuration={isServiceWithoutDuration}
                  isChecking={isCheckingProfessionalAvailability}
                  isAvailable={isSelectedProfessionalAvailable}
                  error={errorProfessionalAvailability}
                />

                {hasNoAvailableHours && (
                  <Alert.Root status="warning" rounded="xl" role="status">
                    <Alert.Indicator />
                    <Alert.Title>
                      Nenhum horário disponível para este serviço na data
                      selecionada.
                    </Alert.Title>
                  </Alert.Root>
                )}

                <Field
                  label="Observações"
                  invalid={Boolean(errors.notes)}
                  errorText={errors.notes?.message}
                >
                  <Textarea
                    {...form.register('notes')}
                    variant="subtle"
                    placeholder="Observações (opcional)"
                    size="sm"
                    rows={4}
                    maxLength={500}
                    {...inputFieldStyles}
                  />
                </Field>
              </Stack>
            </Drawer.Body>
            <Drawer.Footer flexWrap="wrap" gap="2">
              <Drawer.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  colorPalette="red"
                  rounded="lg"
                  disabled={isPendingCreateAppointment}
                >
                  Cancelar
                </Button>
              </Drawer.ActionTrigger>

              <Button
                size="sm"
                colorPalette="brand"
                rounded="lg"
                loading={isPendingCreateAppointment}
                disabled={
                  isLoadingAvailableHours || isCheckingProfessionalAvailability
                }
                onClick={onSubmitCreateAppointment}
              >
                <Icon as={SaveIcon} boxSize="5" />
                Salvar
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default SidebarCreateAppointment
