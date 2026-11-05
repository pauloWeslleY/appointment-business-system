import { createListCollection } from '@chakra-ui/react'

import {
  AppointmentStatus,
  appointmentStatusLabel,
  type AppointmentStatusType,
} from '../types/appointment-status.type'

const appointmentStatusDescription: Record<AppointmentStatusType, string> = {
  [AppointmentStatus.PENDING]: 'Aguardando confirmação.',
  [AppointmentStatus.CONFIRMED]: 'Confirmar o agendamento.',
  [AppointmentStatus.CANCELLED]: 'Cancelado o agendamento.',
  [AppointmentStatus.CONCLUDED]: 'Concluído o agendamento.',
} as const

export const loadSelectStatusAppointment = Object.entries(AppointmentStatus).map(
  ([, value]) => ({
    value,
    label: appointmentStatusLabel[value as AppointmentStatusType],
    description: appointmentStatusDescription[value as AppointmentStatusType],
  }),
)

export const loadCollectionStatusAppointment = createListCollection({
  items: loadSelectStatusAppointment.map((appointmentStatus) => ({
    label: appointmentStatus.label,
    value: appointmentStatus.value,
  })),
})
