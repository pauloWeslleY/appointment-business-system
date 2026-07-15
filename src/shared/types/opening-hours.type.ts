export interface OpeningHoursIntervalProps {
  open: string
  close: string
}

export interface OpeningHoursDayProps {
  day: number
  intervals: OpeningHoursIntervalProps[]
}
