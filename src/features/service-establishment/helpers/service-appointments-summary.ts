import type { StatusProps } from '@/components/ui/status'
import { AppointmentStatus } from '@/features/appointment/types/appointment-status.type'

import type { ServiceEstablishmentDetailsModel } from '../types/service-establishment-details.model'

interface ServiceAppointmentsSummary {
  all: number
  upcoming: number
  concluded: number
  cancelled: number
}

export interface ServiceAppointmentsSummaryItem {
  label: string
  value: number
  status?: StatusProps['value']
}

export function summarizeServiceAppointments(
  serviceAppointments: ServiceEstablishmentDetailsModel['appointments'],
): ServiceAppointmentsSummary {
  const currentDate = new Date()

  return serviceAppointments.reduce<ServiceAppointmentsSummary>(
    (serviceAppointmentsSummary, serviceAppointment) => {
      serviceAppointmentsSummary.all += 1

      if (serviceAppointment.status === AppointmentStatus.CONCLUDED) {
        serviceAppointmentsSummary.concluded += 1
      }

      if (serviceAppointment.status === AppointmentStatus.CANCELLED) {
        serviceAppointmentsSummary.cancelled += 1
      }

      const isUpcomingConfirmedAppointment =
        serviceAppointment.status === AppointmentStatus.CONFIRMED &&
        new Date(serviceAppointment.date) >= currentDate

      if (isUpcomingConfirmedAppointment) {
        serviceAppointmentsSummary.upcoming += 1
      }

      return serviceAppointmentsSummary
    },
    { all: 0, upcoming: 0, concluded: 0, cancelled: 0 },
  )
}

export function buildServiceAppointmentsSummaryItems(
  serviceAppointments: ServiceEstablishmentDetailsModel['appointments'],
): ServiceAppointmentsSummaryItem[] {
  const serviceAppointmentsSummary =
    summarizeServiceAppointments(serviceAppointments)

  return [
    {
      label: 'Total de agendamentos',
      value: serviceAppointmentsSummary.all,
    },
    {
      label: 'Agendamentos concluídos',
      value: serviceAppointmentsSummary.concluded,
      status: 'success',
    },
    {
      label: 'Agendamentos cancelados',
      value: serviceAppointmentsSummary.cancelled,
      status: 'error',
    },
    {
      label: 'Agendamentos futuros',
      value: serviceAppointmentsSummary.upcoming,
      status: 'info',
    },
  ]
}
