export interface WeekDay {
  label: string
  value: string
}

export const weekDaysLabels = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

export const createListWeekDays = (): WeekDay[] => {
  const weekDays: WeekDay[] = []

  for (let day = 0; day < 7; day++) {
    weekDays.push({
      label: weekDaysLabels[day],
      value: day.toString(),
    })
  }
  return weekDays
}
