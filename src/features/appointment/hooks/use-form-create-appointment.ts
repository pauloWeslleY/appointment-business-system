import {
  createListCollection,
  type DatePickerValueChangeDetails,
  type DrawerOpenChangeDetails,
  parseDate,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useGetAllCustomersByEstablishment } from '@/features/customers/hooks/use-get-all-customers-by-establishment'
import { establishmentAvailabilityQueryOptions } from '@/features/establishment/queries/establishment.query-options'
import { useProfessionalsList } from '@/features/professionals/hooks/use-professionals'
import { professionalAvailabilityQueryOptions } from '@/features/professionals/queries/professionals.query-options'
import { useGetServiceByEstablishment } from '@/features/service-establishment/hooks/use-get-service-by-establishment'

import {
  appointmentDateTime,
  appointmentToday,
  calculateAppointmentEndsAt,
} from '../helpers/appointment-date'
import { appointmentMutationOptions } from '../queries/appointment.mutation-options'
import { CreateAppointmentSchema } from '../schemas/create-appointment-form.schema'
import type { CreateAppointmentFormType } from '../types/appointment-form.type'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

const createAppointmentDefaultValues: CreateAppointmentFormType = {
  customerId: [],
  serviceId: [],
  professionalId: [],
  date: '',
  hour: [],
  notes: '',
}

const isValidCalendarDate = (calendarDate: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(calendarDate) && dayjs(calendarDate).isValid()

export function useFormCreateAppointment() {
  const [isCreateAppointmentDrawerOpen, setIsCreateAppointmentDrawerOpen] =
    useState(false)
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: session } = useAppSession()
  const activeOrganizationId = session?.session.activeOrganizationId

  const formCreateAppointment = useForm<CreateAppointmentFormType>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: createAppointmentDefaultValues,
  })

  const [
    selectedServiceIds,
    selectedAppointmentDate,
    selectedAppointmentHours,
    selectedProfessionalIds,
  ] = useWatch({
    control: formCreateAppointment.control,
    name: ['serviceId', 'date', 'hour', 'professionalId'],
  })
  const selectedServiceId = selectedServiceIds[0]
  const selectedAppointmentHour = selectedAppointmentHours[0]
  const selectedProfessionalId = selectedProfessionalIds[0]

  const {
    data: establishmentCustomers,
    isLoading: isLoadingCustomers,
    error: customersError,
  } = useGetAllCustomersByEstablishment(
    establishment.id,
    isCreateAppointmentDrawerOpen,
  )
  const {
    data: establishmentServices,
    isLoading: isLoadingServices,
    error: servicesError,
  } = useGetServiceByEstablishment(
    establishment.id,
    isCreateAppointmentDrawerOpen,
  )
  const {
    data: establishmentProfessionalsResponse,
    isLoading: isLoadingProfessionals,
    error: professionalsError,
  } = useProfessionalsList(establishment.id, isCreateAppointmentDrawerOpen)

  const { servicesCollection, selectedService } = useMemo(() => {
    const activeServices = (establishmentServices ?? []).filter(
      (service) => service.status,
    )

    const selectedService = activeServices.find(
      (service) => service.id === selectedServiceId,
    )

    const servicesCollection = createListCollection({
      items: activeServices.map((service) => ({
        label: service.name,
        value: service.id,
      })),
    })

    return {
      servicesCollection,
      selectedService,
    }
  }, [establishmentServices, selectedServiceId])

  const serviceDurationInMinutes = selectedService?.durationInMinutes ?? 0

  const hasValidAppointmentDate = isValidCalendarDate(selectedAppointmentDate)
  const startOfSelectedAppointmentDate = hasValidAppointmentDate
    ? appointmentDateTime(
        selectedAppointmentDate,
        '00:00',
        establishment.timezone,
      )
    : ''

  const {
    data: availableHours,
    isFetching: isLoadingAvailableHours,
    error: availableHoursError,
  } = useQuery(
    establishmentAvailabilityQueryOptions(
      {
        establishmentId: establishment.id,
        serviceId: selectedServiceId ?? '',
        professionalId: selectedProfessionalId,
        selectedDate: startOfSelectedAppointmentDate,
      },
      { userId: session?.user.id, organizationId: activeOrganizationId },
    ),
  )

  const appointmentStartsAt =
    hasValidAppointmentDate && selectedAppointmentHour
      ? appointmentDateTime(
          selectedAppointmentDate,
          selectedAppointmentHour,
          establishment.timezone,
        )
      : ''

  const appointmentEndsAt =
    appointmentStartsAt && serviceDurationInMinutes > 0
      ? calculateAppointmentEndsAt(
          appointmentStartsAt,
          serviceDurationInMinutes,
        )
      : ''

  const {
    data: professionalAvailability,
    isFetching: isCheckingProfessionalAvailability,
    error: professionalAvailabilityQueryError,
  } = useQuery(
    professionalAvailabilityQueryOptions(
      {
        professionalId: selectedProfessionalId ?? '',
        establishmentId: establishment.id,
        organizationId: activeOrganizationId ?? '',
        startsAt: appointmentStartsAt,
        endsAt: appointmentEndsAt,
      },
      session?.user.id,
    ),
  )

  const hasProfessionalSelected = Boolean(selectedProfessionalId)
  const isServiceWithoutDuration =
    hasProfessionalSelected &&
    Boolean(selectedService) &&
    serviceDurationInMinutes <= 0

  const isSelectedProfessionalAvailable =
    hasProfessionalSelected &&
    professionalAvailability?.available === true &&
    !isCheckingProfessionalAvailability

  const canScheduleWithProfessional =
    !hasProfessionalSelected || isSelectedProfessionalAvailable

  const createAppointmentMutationOptions = appointmentMutationOptions.create()
  const {
    mutate: createNewAppointment,
    isPending: isPendingCreateNewAppointment,
  } = useMutation({
    ...createAppointmentMutationOptions,
    onSuccess: async (...createAppointmentSuccessParams) => {
      await createAppointmentMutationOptions.onSuccess?.(
        ...createAppointmentSuccessParams,
      )
      formCreateAppointment.reset(createAppointmentDefaultValues)
      toaster.success({ title: 'Agendamento criado com sucesso.' })
      setIsCreateAppointmentDrawerOpen(false)
    },
    onError: (createAppointmentError) => {
      toaster.error({
        title: 'Erro ao criar agendamento.',
        description: createAppointmentError.message,
      })
    },
  })

  const createAppointmentFormErrors = formCreateAppointment.formState.errors
  const minimumAppointmentDate = appointmentToday(establishment.timezone)

  const customersCollection = useMemo(() => {
    const activeCustomers = (establishmentCustomers ?? []).filter(
      (customer) => customer.active && customer.status,
    )

    return createListCollection({
      items: activeCustomers.map((customer) => ({
        label: customer.name,
        value: customer.id,
      })),
    })
  }, [establishmentCustomers])

  const professionalsCollection = useMemo(() => {
    return createListCollection({
      items: (establishmentProfessionalsResponse?.professionals ?? []).map(
        (professional) => ({
          label: professional.displayName,
          value: professional.id,
        }),
      ),
    })
  }, [establishmentProfessionalsResponse?.professionals])

  const availableHoursCollection = useMemo(
    () => createListCollection({ items: availableHours ?? [] }),
    [availableHours],
  )

  const appointmentOptionsError =
    customersError ?? servicesError ?? professionalsError

  const hasAppointmentScheduleSelected =
    Boolean(selectedServiceId) && hasValidAppointmentDate

  const professionalAvailabilityError = hasProfessionalSelected
    ? professionalAvailabilityQueryError
    : null

  const isCustomersCollectionEmpty = customersCollection.items.length === 0
  const isServicesCollectionEmpty = servicesCollection.items.length === 0
  const isProfessionalsCollectionEmpty =
    professionalsCollection.items.length === 0
  const isAvailableHoursCollectionEmpty =
    availableHoursCollection.items.length === 0

  const customersHelperText =
    !isLoadingCustomers && isCustomersCollectionEmpty
      ? 'Nenhum cliente ativo cadastrado neste estabelecimento.'
      : undefined
  const servicesHelperText =
    !isLoadingServices && isServicesCollectionEmpty
      ? 'Nenhum serviço ativo cadastrado neste estabelecimento.'
      : undefined
  const availableHoursHelperText = hasAppointmentScheduleSelected
    ? undefined
    : 'Selecione o serviço e a data para ver os horários disponíveis.'

  const isAppointmentHourFieldDisabled =
    !hasAppointmentScheduleSelected ||
    Boolean(availableHoursError) ||
    isAvailableHoursCollectionEmpty
  const hasNoAvailableHours =
    hasAppointmentScheduleSelected &&
    !isLoadingAvailableHours &&
    !availableHoursError &&
    isAvailableHoursCollectionEmpty
  const isSaveAppointmentDisabled =
    isLoadingAvailableHours || isCheckingProfessionalAvailability

  const isAppointmentDateInvalid = Boolean(createAppointmentFormErrors.date)
  const isAppointmentNotesInvalid = Boolean(createAppointmentFormErrors.notes)
  const minimumAppointmentCalendarDate = parseDate(minimumAppointmentDate)
  const selectedAppointmentCalendarDates = selectedAppointmentDate
    ? [parseDate(selectedAppointmentDate)]
    : []

  const changeAppointmentScheduleField = (
    scheduleFieldName: 'serviceId' | 'date' | 'professionalId',
    scheduleFieldValue: CreateAppointmentFormType[typeof scheduleFieldName],
  ) => {
    formCreateAppointment.setValue(scheduleFieldName, scheduleFieldValue, {
      shouldDirty: true,
      shouldValidate: true,
    })
    formCreateAppointment.setValue('hour', [])
  }

  const changeAppointmentService = (
    selectedAppointmentServiceIds: string[],
  ) => {
    changeAppointmentScheduleField('serviceId', selectedAppointmentServiceIds)
  }

  const changeAppointmentProfessional = (
    selectedAppointmentProfessionalIds: string[],
  ) => {
    changeAppointmentScheduleField(
      'professionalId',
      selectedAppointmentProfessionalIds,
    )
  }

  const changeAppointmentDate = (
    appointmentDateChangeDetails: DatePickerValueChangeDetails,
  ) => {
    changeAppointmentScheduleField(
      'date',
      appointmentDateChangeDetails.value[0]?.toString() ?? '',
    )
  }

  const handleCreateAppointment = formCreateAppointment.handleSubmit(
    (createAppointmentFormValues) => {
      if (!activeOrganizationId) {
        toaster.error({ title: 'Selecione uma organização ativa.' })
        return
      }

      if (isServiceWithoutDuration) {
        toaster.error({
          title: 'Serviço sem duração definida.',
          description:
            'Defina a duração do serviço para agendar com um profissional.',
        })

        return
      }

      if (!canScheduleWithProfessional) {
        toaster.error({
          title: 'Profissional indisponível.',
          description:
            'Escolha outro horário ou profissional, ou deixe o profissional em branco.',
        })

        return
      }

      createNewAppointment({
        customerId: createAppointmentFormValues.customerId[0],
        serviceId: createAppointmentFormValues.serviceId[0],
        professionalId: createAppointmentFormValues.professionalId[0] ?? null,
        establishmentId: establishment.id,
        organizationId: activeOrganizationId,
        date: appointmentDateTime(
          createAppointmentFormValues.date,
          createAppointmentFormValues.hour[0],
          establishment.timezone,
        ),
        notes: createAppointmentFormValues.notes.trim() || null,
      })
    },
  )

  const handleResetCreateAppointment = () => {
    formCreateAppointment.reset(createAppointmentDefaultValues)
  }

  const changeCreateAppointmentDrawerOpen = (
    drawerOpenChangeDetails: DrawerOpenChangeDetails,
  ) => {
    const shouldCloseCreateAppointmentDrawer = !drawerOpenChangeDetails.open

    if (shouldCloseCreateAppointmentDrawer && isPendingCreateNewAppointment) {
      return
    }

    if (shouldCloseCreateAppointmentDrawer) {
      handleResetCreateAppointment()
    }

    setIsCreateAppointmentDrawerOpen(drawerOpenChangeDetails.open)
  }

  return {
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
  }
}
