import { RegexTime } from '@/shared/utils/regex-time'

function toMinutesSinceMidnight(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function countCustomTimesInPeriod(
  openTime: string,
  closeTime: string,
): number {
  if (!RegexTime.test(openTime) || !RegexTime.test(closeTime)) {
    return 0
  }

  const openTimeMinutes = toMinutesSinceMidnight(openTime)
  const closeTimeMinutes = toMinutesSinceMidnight(closeTime)

  if (closeTimeMinutes <= openTimeMinutes) {
    return 0
  }

  return closeTimeMinutes - openTimeMinutes
}
