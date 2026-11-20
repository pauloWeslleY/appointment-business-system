import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getEstablishmentCurrentDate = (establishmentTimezone: string) => {
  try {
    return dayjs().tz(establishmentTimezone)
  } catch {
    return null
  }
}

export const formatEstablishmentDateTime = (
  date: string | null,
  establishmentTimezone: string,
) => {
  if (!date) {
    return 'Sem data'
  }

  try {
    return dayjs(date).tz(establishmentTimezone).format('DD/MM/YYYY [às] HH:mm')
  } catch {
    return 'Data indisponível'
  }
}
