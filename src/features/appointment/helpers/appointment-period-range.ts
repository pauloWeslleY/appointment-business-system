import dayjs, { type Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import {
  AppointmentPeriod,
  type AppointmentPeriodType,
} from '../constants/appointment-period'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isoWeek)

const ROUTE_DATE_FORMAT = 'YYYY-MM-DD'

export interface AppointmentPeriodRange {
  from: string
  to: string
}

const formatPeriodRange = (
  periodStart: Dayjs,
  periodEnd: Dayjs,
): AppointmentPeriodRange => ({
  from: periodStart.format(ROUTE_DATE_FORMAT),
  to: periodEnd.format(ROUTE_DATE_FORMAT),
})

export function appointmentPeriodRange(
  period: AppointmentPeriodType,
  establishmentTimezone: string,
): AppointmentPeriodRange {
  const establishmentToday = dayjs().tz(establishmentTimezone)

  switch (period) {
    case AppointmentPeriod.TODAY: {
      return formatPeriodRange(establishmentToday, establishmentToday)
    }

    case AppointmentPeriod.TOMORROW: {
      const establishmentTomorrow = establishmentToday.add(1, 'day')

      return formatPeriodRange(establishmentTomorrow, establishmentTomorrow)
    }

    case AppointmentPeriod.THIS_WEEK: {
      return formatPeriodRange(
        establishmentToday.startOf('isoWeek'),
        establishmentToday.endOf('isoWeek'),
      )
    }

    case AppointmentPeriod.NEXT_THIRTY_DAYS: {
      return formatPeriodRange(
        establishmentToday,
        // Hoje conta como o primeiro dos 30 dias, então o último fica 29 dias à frente.
        establishmentToday.add(29, 'day'),
      )
    }
  }
}

export function isAppointmentPeriodSelected(
  periodRange: AppointmentPeriodRange,
  selectedRange: AppointmentPeriodRange,
): boolean {
  const isSameStart = periodRange.from === selectedRange.from
  const isSameEnd = periodRange.to === selectedRange.to

  return isSameStart && isSameEnd
}
