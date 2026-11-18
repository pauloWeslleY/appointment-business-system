import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import { appointmentLocalDate } from './appointment-date'

export interface AppointmentDayGroup {
  dayKey: string
  dayLabel: string
  appointments: GetAppointmentByEstablishmentModel[]
}

const capitalizeFirstLetter = (text: string): string =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`

// "segunda-feira, 23 de novembro" → "Segunda, 23 de novembro"
const formatAppointmentDayLabel = (
  startsAt: string,
  establishmentTimezone: string,
): string => {
  const appointmentDayLabel = appointmentLocalDate(
    startsAt,
    establishmentTimezone,
  )
    .locale('pt-br')
    .format('dddd, D [de] MMMM')
    .replace('-feira', '')

  return capitalizeFirstLetter(appointmentDayLabel)
}

// A API já devolve os agendamentos ordenados por início; a ordem dos grupos
// segue a primeira ocorrência de cada dia.
export function groupAppointmentsByDay(
  appointments: GetAppointmentByEstablishmentModel[],
  establishmentTimezone: string,
): AppointmentDayGroup[] {
  const appointmentDayGroups = new Map<string, AppointmentDayGroup>()

  for (const appointment of appointments) {
    const dayKey = appointmentLocalDate(
      appointment.startsAt,
      establishmentTimezone,
    ).format('YYYY-MM-DD')
    const existingDayGroup = appointmentDayGroups.get(dayKey)

    if (existingDayGroup) {
      existingDayGroup.appointments.push(appointment)
      continue
    }

    appointmentDayGroups.set(dayKey, {
      dayKey,
      dayLabel: formatAppointmentDayLabel(
        appointment.startsAt,
        establishmentTimezone,
      ),
      appointments: [appointment],
    })
  }

  return [...appointmentDayGroups.values()]
}
