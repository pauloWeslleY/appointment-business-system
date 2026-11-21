import { useQuery } from '@tanstack/react-query'
import { getRouteApi, useRouteContext } from '@tanstack/react-router'

import { customerByIdQueryOptions } from '@/features/customers/queries/customers.query-options'
import { professionalDetailsQueryOptions } from '@/features/professionals/queries/professionals.query-options'
import { serviceEstablishmentDetailQueryOptions } from '@/features/service-establishment/queries/service-establishment.query-options'
import { formattedDurationInMinutesService } from '@/features/service-establishment/utils/formatted-duration-in-minutes-service'
import { formattedPhone } from '@/shared/utils/formatted-mask'
import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import {
  appointmentDurationInMinutes,
  appointmentLocalDate,
} from '../helpers/appointment-date'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import { useAppointmentStatusAction } from './use-appointment-status-action'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useAppointmentAgendaItem(
  appointment: GetAppointmentByEstablishmentModel,
) {
  const { session } = useRouteContext({
    from: '/_app/_authenticated/dashboard/$slug',
  })
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: detailedProfessional } = useQuery({
    ...professionalDetailsQueryOptions(
      appointment.professionalId ?? undefined,
      session.user.id,
      establishment.organizationId,
    ),
    select: (professional) => ({
      name: professional.professional.displayName,
    }),
  })

  const { data: detailedCustomer } = useQuery({
    ...customerByIdQueryOptions(
      appointment.customerId,
      session.user.id,
      establishment.organizationId,
    ),
    select: (customer) => ({
      name: customer.name,
      phoneNumber:
        customer.phones.length > 0 ? formattedPhone(customer.phones[0]) : 'N/A',
    }),
  })

  const { data: detailedServiceAppointment } = useQuery({
    ...serviceEstablishmentDetailQueryOptions(
      appointment.serviceId,
      session.user.id,
      establishment.organizationId,
    ),
    select: (serviceEstablishment) => ({
      name: serviceEstablishment.name,
      price: formatCurrencyInCents(serviceEstablishment.servicePriceInCents),
    }),
  })

  const {
    appointmentStatusAction,
    isUpdatingAppointmentStatus,
    applyAppointmentStatusAction,
  } = useAppointmentStatusAction(appointment)

  const appointmentStatusColor = getBadgeAppointmentColor[appointment.status]
  const appointmentStartsAt = appointmentLocalDate(
    appointment.startsAt,
    establishment.timezone,
  )

  const appointmentStartTime = appointmentStartsAt.format('HH:mm')
  const appointmentDuration = formattedDurationInMinutesService(
    appointmentDurationInMinutes(appointment.startsAt, appointment.endsAt),
  )

  return {
    isUpdatingAppointmentStatus,
    appointmentStatusAction,
    appointmentStatusColor,
    appointmentStartTime,
    appointmentDuration,
    detailedProfessional,
    detailedCustomer,
    detailedServiceAppointment,
    applyAppointmentStatusAction,
  }
}
