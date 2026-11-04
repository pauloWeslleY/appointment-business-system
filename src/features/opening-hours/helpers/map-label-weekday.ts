export const mapLabelWeekday = (weekday: number) => {
  const labels: Record<number, string> = {
    1: 'Segunda-feira',
    2: 'Terça-feira',
    3: 'Quarta-feira',
    4: 'Quinta-feira',
    5: 'Sexta-feira',
    6: 'Sábado',
    7: 'Domingo',
  }

  return labels[weekday] ?? weekday
}

export const mapLabelOpeningHoursIntervals = (
  intervals: { open: string; close: string }[],
) => {
  const formattedIntervals = intervals.map(
    (interval) => `${interval.open} - ${interval.close}`,
  )
  return formattedIntervals.join(', ')
}

export const mapLabelOpeningHoursIntervalsSummary = (
  intervals: { open: string; close: string }[],
) => {
  return intervals.reduce<{ open: string; close: string }>(
    (summary, interval) => {
      summary.open += `Aberto: ${interval.open}`
      summary.close += `Fechado: ${interval.close}`
      return summary
    },
    {
      open: '',
      close: '',
    },
  )
}
