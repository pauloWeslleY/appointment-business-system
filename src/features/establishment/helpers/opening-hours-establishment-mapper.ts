import { weekDaysLabels } from '@/shared/utils/create-list-weekdays'

import type { EstablishmentOpeningHoursType } from '../types/opening-hours-response.type'

const openingHoursIntervalFormatter = (
  intervals: { open: string; close: string }[],
) => {
  const formattedIntervals = intervals.map(
    (interval) => `${interval.open} - ${interval.close}`,
  )

  return formattedIntervals.join(', ')
}

export function openingHoursEstablishmentMapper(
  openingHours: EstablishmentOpeningHoursType,
) {
  const openingHoursByDay = openingHours.map((item) => ({
    day: weekDaysLabels[item.day],
    intervals: openingHoursIntervalFormatter(item.intervals),
  }))

  return openingHoursByDay
}
