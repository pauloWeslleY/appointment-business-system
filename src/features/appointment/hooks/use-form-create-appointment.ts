import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useGetAllCustomersByEstablishment } from '@/features/customers/hooks/use-get-all-customers-by-establishment'
import { establishmentAvailabilityQueryOptions } from '@/features/establishment/queries/establishment.query-options'
import { useProfessionals } from '@/features/professionals/hooks/use-professionals'
import { professionalAvailabilityQueryOptions } from '@/features/professionals/queries/professionals.query-options'
import { useGetServiceByEstablishment } from '@/features/service-establishment/hooks/use-get-service-by-establishment'

import { appointmentMutationOptions } from '../queries/appointment.mutation-options'
import { CreateAppointmentSchema } from '../schemas/create-appointment-form.schema'
import type { CreateAppointmentFormType } from '../types/appointment-form.type'
import {
  appointmentDateTime,
  appointmentToday,
  calculateAppointmentEndsAt,
} from '../utils/appointment-date'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

const createAppointmentDefaultValues: CreateAppointmentFormType = {
  customerId: [],
  serviceId: [],
  professionalId: [],
  date: '',
  hour: [],
  notes: '',
}

const isValidCalendarDate = (date: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(date) && dayjs(date).isValid()

export function useFormCreateAppointment(
  onCreated: () => void,
  enabled = true,
) {
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: session } = useAppSession()
  const organizationId = session?.session.activeOrganizationId

  const form = useForm<CreateAppointmentFormType>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: createAppointmentDefaultValues,
  })

  const [serviceId, date, hour, professionalId] = useWatch({
    control: form.control,
    name: ['serviceId', 'date', 'hour', 'professionalId'],
  })

  const customers = useGetAllCustomersByEstablishment(establishment.id, enabled)
  const services = useGetServiceByEstablishment(establishment.id, enabled)
  const professionals = useProfessionals(establishment.id, enabled)

  const activeCustomers = (customers.data ?? []).filter(
    (customer) => customer.active && customer.status,
  )

  const activeServices = (services.data ?? []).filter(
    (service) => service.status,
  )

  const selectedService = activeServices.find(
    (service) => service.id === serviceId[0],
  )

  const serviceDurationInMinutes = selectedService?.durationInMinutes ?? 0

  const hasValidDate = isValidCalendarDate(date)
  const startOfSelectedDate = hasValidDate
    ? appointmentDateTime(date, '00:00', establishment.timezone)
    : ''

  const availableHours = useQuery(
    establishmentAvailabilityQueryOptions({
      establishmentId: establishment.id,
      serviceId: serviceId[0] ?? '',
      selectedDate: startOfSelectedDate,
    }),
  )

  const appointmentStartsAt =
    hasValidDate && hour[0]
      ? appointmentDateTime(date, hour[0], establishment.timezone)
      : ''
  const appointmentEndsAt =
    appointmentStartsAt && serviceDurationInMinutes > 0
      ? calculateAppointmentEndsAt(
          appointmentStartsAt,
          serviceDurationInMinutes,
        )
      : ''

  const professionalAvailability = useQuery(
    professionalAvailabilityQueryOptions(
      {
        professionalId: professionalId[0] ?? '',
        establishmentId: establishment.id,
        organizationId: organizationId ?? '',
        startsAt: appointmentStartsAt,
        endsAt: appointmentEndsAt,
      },
      session?.user.id,
    ),
  )

  const hasProfessionalSelected = Boolean(professionalId[0])
  const isServiceWithoutDuration =
    hasProfessionalSelected &&
    Boolean(selectedService) &&
    serviceDurationInMinutes <= 0
  const isSelectedProfessionalAvailable =
    hasProfessionalSelected &&
    professionalAvailability.data?.available === true &&
    !professionalAvailability.isFetching
  const canScheduleWithProfessional =
    !hasProfessionalSelected || isSelectedProfessionalAvailable

  const mutationOptions = appointmentMutationOptions.create()
  const mutation = useMutation({
    ...mutationOptions,
    onSuccess: async (...args) => {
      await mutationOptions.onSuccess?.(...args)
      form.reset(createAppointmentDefaultValues)
      toaster.success({ title: 'Agendamento criado com sucesso.' })
      onCreated()
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao criar agendamento.',
        description: error.message,
      })
    },
  })

  const onChangeScheduleField = (
    name: 'serviceId' | 'date',
    value: CreateAppointmentFormType[typeof name],
  ) => {
    form.setValue(name, value, { shouldDirty: true, shouldValidate: true })
    form.setValue('hour', [])
  }

  const onSubmitCreateAppointment = form.handleSubmit((data) => {
    if (mutation.isPending) {
      return
    }

    if (!organizationId) {
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

    mutation.mutate({
      customerId: data.customerId[0],
      serviceId: data.serviceId[0],
      professionalId: data.professionalId[0] ?? null,
      establishmentId: establishment.id,
      organizationId,
      date: appointmentDateTime(
        data.date,
        data.hour[0],
        establishment.timezone,
      ),
      notes: data.notes.trim() || null,
    })
  })

  const onResetCreateAppointment = () => {
    form.reset(createAppointmentDefaultValues)
  }

  return {
    form,
    errors: form.formState.errors,
    minimumDate: appointmentToday(establishment.timezone),
    customersCollection: createListCollection({
      items: activeCustomers.map((customer) => ({
        label: customer.name,
        value: customer.id,
      })),
    }),
    servicesCollection: createListCollection({
      items: activeServices.map((service) => ({
        label: service.name,
        value: service.id,
      })),
    }),
    professionalsCollection: createListCollection({
      items: (professionals.data?.professionals ?? []).map((professional) => ({
        label: professional.displayName,
        value: professional.id,
      })),
    }),
    hoursCollection: createListCollection({
      items: availableHours.data ?? [],
    }),
    isLoadingCustomers: customers.isLoading,
    isLoadingServices: services.isLoading,
    isLoadingProfessionals: professionals.isLoading,
    isLoadingAvailableHours: availableHours.isFetching,
    errorLoadingOptions:
      customers.error ?? services.error ?? professionals.error,
    errorAvailableHours: availableHours.error,
    hasScheduleSelected: Boolean(serviceId[0]) && hasValidDate,
    isServiceWithoutDuration,
    isCheckingProfessionalAvailability: professionalAvailability.isFetching,
    isSelectedProfessionalAvailable,
    errorProfessionalAvailability: hasProfessionalSelected
      ? professionalAvailability.error
      : null,
    isPendingCreateAppointment: mutation.isPending,
    onChangeScheduleField,
    onSubmitCreateAppointment,
    onResetCreateAppointment,
  }
}
