import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import { appointmentLocalDate } from './appointment-date'

export interface AppointmentDayGroup {
  dayKey: string
  dayLabel: string
  appointments: GetAppointmentByEstablishmentModel[]
}

const capitalizeFirstLetter = (text: string): string =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`

const formatAppointmentDayLabel = (
  startsAt: string,
  establishmentTimezone: string,
): string => {
  const appointmentDayLabel = appointmentLocalDate(
    startsAt,
    establishmentTimezone,
  )

  const appointmentDayLabelLocale = appointmentDayLabel.locale('pt-br')
  const formattadAppointmentDay =
    appointmentDayLabelLocale.format('dddd, D [de] MMMM')
  return capitalizeFirstLetter(formattadAppointmentDay.replace('-feira', ''))
}

export function groupAppointmentsByDay(
  appointments: GetAppointmentByEstablishmentModel[],
  establishmentTimezone: string,
): AppointmentDayGroup[] {
  const appointmentDayGroups = new Map<string, AppointmentDayGroup>()

  for (const appointment of appointments) {
    const dayKey = appointmentLocalDate(
      appointment.startsAt,
      establishmentTimezone,
    )
    const formattedDayKey = dayKey.format('YYYY-MM-DD')
    const existingDayGroup = appointmentDayGroups.get(formattedDayKey)

    if (existingDayGroup) {
      existingDayGroup.appointments.push(appointment)
      continue
    }

    appointmentDayGroups.set(formattedDayKey, {
      dayKey: formattedDayKey,
      dayLabel: formatAppointmentDayLabel(
        appointment.startsAt,
        establishmentTimezone,
      ),
      appointments: [appointment],
    })
  }

  return [...appointmentDayGroups.values()]
}
