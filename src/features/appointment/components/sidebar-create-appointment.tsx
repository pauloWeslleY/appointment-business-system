import {
  Alert,
  Button,
  CloseButton,
  DatePicker,
  Drawer,
  Icon,
  Portal,
  SimpleGrid,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { Calendar, CalendarPlusIcon, SaveIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import { contentCss, inputFieldCss } from '@/theme/styles/global-styles'

import { useFormCreateAppointment } from '../hooks/use-form-create-appointment'
import ProfessionalAvailabilityAlert from './professional-availability-alert'
import SelectFieldAppointment from './select-field-appointment'

const createAppointmentFormId = 'create-appointment-form'

const SidebarCreateAppointment = () => {
  const {
    isCreateAppointmentDrawerOpen,
    changeCreateAppointmentDrawerOpen,
    formCreateAppointment,
    createAppointmentFormErrors,
    isAppointmentDateInvalid,
    isAppointmentNotesInvalid,
    minimumAppointmentCalendarDate,
    selectedAppointmentCalendarDates,
    customersCollection,
    servicesCollection,
    professionalsCollection,
    availableHoursCollection,
    isLoadingCustomers,
    isLoadingServices,
    isLoadingProfessionals,
    isLoadingAvailableHours,
    isCustomersCollectionEmpty,
    isServicesCollectionEmpty,
    isProfessionalsCollectionEmpty,
    customersHelperText,
    servicesHelperText,
    availableHoursHelperText,
    isAppointmentHourFieldDisabled,
    hasNoAvailableHours,
    isSaveAppointmentDisabled,
    appointmentOptionsError,
    availableHoursError,
    isServiceWithoutDuration,
    isCheckingProfessionalAvailability,
    isSelectedProfessionalAvailable,
    professionalAvailabilityError,
    isPendingCreateNewAppointment,
    changeAppointmentService,
    changeAppointmentProfessional,
    changeAppointmentDate,
    handleCreateAppointment,
  } = useFormCreateAppointment()

  return (
    <Drawer.Root
      open={isCreateAppointmentDrawerOpen}
      onOpenChange={changeCreateAppointmentDrawerOpen}
      size="md"
    >
      <Drawer.Trigger asChild>
        <Button rounded="lg" size="xs" colorPalette="brand">
          <Icon as={CalendarPlusIcon} boxSize="5" />
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
              {appointmentOptionsError && (
                <Alert.Root status="error" rounded="xl">
                  <Alert.Indicator />
                  <Alert.Title>{appointmentOptionsError.message}</Alert.Title>
                </Alert.Root>
              )}

              <Stack asChild gap="4" w="full" mt="5">
                <form
                  id={createAppointmentFormId}
                  aria-label="Novo agendamento"
                  noValidate
                  onSubmit={handleCreateAppointment}
                >
                  <Controller
                    control={formCreateAppointment.control}
                    name="customerId"
                    render={({ field: customerField }) => (
                      <SelectFieldAppointment
                        required
                        label="Cliente"
                        placeholder="Selecione o cliente"
                        disabled={isCustomersCollectionEmpty}
                        collection={customersCollection}
                        value={customerField.value}
                        onValueChange={customerField.onChange}
                        loading={isLoadingCustomers}
                        errorText={
                          createAppointmentFormErrors.customerId?.message
                        }
                        helperText={customersHelperText}
                      />
                    )}
                  />

                  <Controller
                    control={formCreateAppointment.control}
                    name="serviceId"
                    render={({ field: serviceField }) => (
                      <SelectFieldAppointment
                        required
                        label="Serviço"
                        placeholder="Selecione o serviço"
                        disabled={isServicesCollectionEmpty}
                        collection={servicesCollection}
                        value={serviceField.value}
                        onValueChange={changeAppointmentService}
                        loading={isLoadingServices}
                        errorText={
                          createAppointmentFormErrors.serviceId?.message
                        }
                        helperText={servicesHelperText}
                      />
                    )}
                  />

                  <Controller
                    control={formCreateAppointment.control}
                    name="professionalId"
                    render={({ field: professionalField }) => (
                      <SelectFieldAppointment
                        clearable
                        label="Profissional"
                        placeholder="Sem profissional definido"
                        collection={professionalsCollection}
                        value={professionalField.value}
                        onValueChange={changeAppointmentProfessional}
                        loading={isLoadingProfessionals}
                        errorText={
                          createAppointmentFormErrors.professionalId?.message
                        }
                        disabled={isProfessionalsCollectionEmpty}
                        helperText="Opcional."
                      />
                    )}
                  />

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                    <Controller
                      control={formCreateAppointment.control}
                      name="date"
                      render={() => (
                        <Field
                          required
                          label="Data"
                          invalid={isAppointmentDateInvalid}
                          errorText={createAppointmentFormErrors.date?.message}
                        >
                          <DatePicker.Root
                            size="sm"
                            variant="subtle"
                            locale="pt-BR"
                            min={minimumAppointmentCalendarDate}
                            invalid={isAppointmentDateInvalid}
                            value={selectedAppointmentCalendarDates}
                            onValueChange={changeAppointmentDate}
                          >
                            <DatePicker.Control>
                              <DatePicker.Input
                                {...inputFieldCss}
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
                      control={formCreateAppointment.control}
                      name="hour"
                      render={({ field: appointmentHourField }) => (
                        <SelectFieldAppointment
                          required
                          label="Horário"
                          placeholder="Selecione o horário"
                          collection={availableHoursCollection}
                          value={appointmentHourField.value}
                          onValueChange={appointmentHourField.onChange}
                          loading={isLoadingAvailableHours}
                          disabled={isAppointmentHourFieldDisabled}
                          errorText={createAppointmentFormErrors.hour?.message}
                          helperText={availableHoursHelperText}
                        />
                      )}
                    />
                  </SimpleGrid>

                  {availableHoursError && (
                    <Alert.Root status="error" rounded="xl">
                      <Alert.Indicator />
                      <Alert.Title>{availableHoursError.message}</Alert.Title>
                    </Alert.Root>
                  )}

                  <ProfessionalAvailabilityAlert
                    isServiceWithoutDuration={isServiceWithoutDuration}
                    isChecking={isCheckingProfessionalAvailability}
                    isAvailable={isSelectedProfessionalAvailable}
                    error={professionalAvailabilityError}
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
                    invalid={isAppointmentNotesInvalid}
                    errorText={createAppointmentFormErrors.notes?.message}
                  >
                    <Textarea
                      {...formCreateAppointment.register('notes')}
                      variant="subtle"
                      placeholder="Observações (opcional)"
                      size="sm"
                      rows={4}
                      maxLength={500}
                      {...inputFieldCss}
                    />
                  </Field>
                </form>
              </Stack>
            </Drawer.Body>
            <Drawer.Footer flexWrap="wrap" gap="2">
              <Drawer.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  colorPalette="red"
                  rounded="lg"
                  disabled={isPendingCreateNewAppointment}
                >
                  Cancelar
                </Button>
              </Drawer.ActionTrigger>

              <Button
                size="sm"
                colorPalette="brand"
                rounded="lg"
                type="submit"
                form={createAppointmentFormId}
                loading={isPendingCreateNewAppointment}
                disabled={isSaveAppointmentDisabled}
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
