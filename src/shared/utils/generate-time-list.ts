import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

interface GenerateDayTimeListParams {
  date: Date
  interval: number
  hours: string
}

export const generateDayTimeList = ({
  date,
  interval,
  hours,
}: GenerateDayTimeListParams): string[] => {
  const hoursList = hours.replace(' - ', ' ').split(' ')
  const openingHour = parseInt(hoursList[0].split(':')[0])
  const closingHour = parseInt(hoursList[1].split(':')[0])

  const startTime = dayjs(date).hour(openingHour).minute(0).second(0)
  const endTime = dayjs(date).hour(closingHour).minute(0).second(0)
  const timeList: string[] = []

  let currentTime = startTime

  while (currentTime.isSameOrBefore(endTime)) {
    timeList.push(currentTime.format('HH:mm'))
    currentTime = currentTime.add(interval, 'minute')
  }

  return timeList
}
