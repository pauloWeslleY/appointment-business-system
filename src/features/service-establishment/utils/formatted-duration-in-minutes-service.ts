import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export function formattedDurationInMinutesService(durationInMinutes: number) {
  if (durationInMinutes === 0) {
    return '0h 0m'
  }
  const serviceDuration = dayjs.duration(durationInMinutes, 'minute')
  const durationInHours = Math.floor(serviceDuration.asHours())
  const durationMinutes = serviceDuration.minutes()
  const validDurationInHours = durationInHours > 0
  const validDurationInMinutes = durationMinutes > 0

  if (validDurationInHours && !validDurationInMinutes) {
    return `${durationInHours}h`
  }

  if (!validDurationInHours && validDurationInMinutes) {
    return `${durationMinutes}min`
  }

  return `${durationInHours}h ${durationMinutes}min`
}
