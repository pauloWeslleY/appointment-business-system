export const AppointmentPeriod = {
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  THIS_WEEK: 'this-week',
  NEXT_THIRTY_DAYS: 'next-thirty-days',
} as const

export type AppointmentPeriodType =
  (typeof AppointmentPeriod)[keyof typeof AppointmentPeriod]
