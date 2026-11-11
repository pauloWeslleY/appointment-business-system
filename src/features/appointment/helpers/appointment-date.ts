import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export function appointmentLocalDate(date: string, zone: string) {
  return dayjs(date).tz(zone)
}

export function appointmentDateTime(
  date: string,
  time: string,
  zone: string,
): string {
  const dateTime = `${date} ${time}`
  return dayjs.tz(dateTime, zone).toISOString()
}

export function appointmentRangeBoundary(
  date: string,
  zone: string,
  end = false,
): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !dayjs(date).isValid()) {
    return ''
  }

  const localDate = dayjs.tz(date, zone)
  return (end ? localDate.endOf('day') : localDate.startOf('day')).toISOString()
}

export function appointmentToday(zone: string): string {
  return dayjs().tz(zone).format('YYYY-MM-DD')
}

export function calculateAppointmentEndsAt(
  startsAt: string,
  durationInMinutes: number,
): string {
  return dayjs(startsAt).add(durationInMinutes, 'minute').toISOString()
}
