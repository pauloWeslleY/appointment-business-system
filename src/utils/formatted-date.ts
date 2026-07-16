import dayjs from 'dayjs'

export const formattedDateAndHours = (
  date: string | Date | null,
  hours: boolean = false,
): string => {
  if (date === null) return 'Sem data'
  const formattedDate = hours ? 'DD/MM/YYYY [às] HH:mm:ss' : 'DD/MM/YYYY'
  return dayjs(date).format(formattedDate)
}
