import dayjs from 'dayjs'

interface IOpeningHour {
  day: number
  intervals: {
    open: string
    close: string
  }[]
}

export const calculateCurrentDayOpeningHours = (
  openingHours: IOpeningHour[],
  timeNow: string,
) => {
  if (openingHours.length === 0) {
    return false
  }

  const intervals = openingHours.map((item) => item.intervals).flat()
  const establishmentOpen =
    timeNow >= intervals[0].open && timeNow <= intervals[0].close

  return establishmentOpen
}

export const currentDayOpeningHours = (openingHours: IOpeningHour) => {
  const currentDate = dayjs()
  const currentDay = currentDate.day()
  if (openingHours.day !== currentDay) {
    return false
  }

  const timeNow = currentDate.format('HH:mm')
  const intervals = openingHours.intervals
  const isOpen = timeNow >= intervals[0].open && timeNow <= intervals[0].close

  return isOpen
}
