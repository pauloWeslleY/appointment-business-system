import { useChart } from '@chakra-ui/charts'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import type { RevenueEstablishmentModel } from '../types/revenue-establishment.model'

export function useRevenueEstablishmentCharts(
  dailyRevenue: RevenueEstablishmentModel[],
) {
  const chartData = useMemo(() => {
    const chartDays = Array.from({ length: 15 }).map((_, index) => {
      return dayjs().add(index, 'day').format('YYYY-MM-DD')
    })

    const dataRevenueCharts = chartDays.map((date) => {
      const dataForDay = dailyRevenue.find((item) => item.date === date)

      return {
        date: dayjs(date).format('DD/MM'),
        fullDate: date,
        bookings: dataForDay?.bookings || 0,
        revenue: dataForDay?.revenue || 0,
      }
    })

    return dataRevenueCharts.filter(
      (item) => item.bookings > 0 || item.revenue > 0,
    )
  }, [dailyRevenue])

  const chartRevenue = useChart({
    data: chartData,
    series: [
      { name: 'bookings', color: 'emerald.solid', label: 'Agendamentos' },
      { name: 'revenue', color: 'primary.solid', label: 'Receita' },
    ],
  })

  const revenueIfExists = chartData.some(
    (item) => item.revenue > 0 || item.bookings > 0,
  )

  function verifyNumber<T>(value: T) {
    return typeof value === 'number' ? value : 0
  }

  return {
    chartRevenue,
    verifyNumber,
    revenueIfExists,
  }
}
