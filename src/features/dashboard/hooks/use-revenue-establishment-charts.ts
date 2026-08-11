import { useChart } from '@chakra-ui/charts'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import type { RevenueEstablishmentModel } from '../types/revenue-establishment.model'

export function useRevenueEstablishmentCharts(
  dailyRevenueData: RevenueEstablishmentModel[],
) {
  const chartData = useMemo(() => {
    const chartDays = Array.from({ length: 15 }).map((_, index) => {
      return dayjs().add(index, 'day').format('YYYY-MM-DD')
    })

    const dataRevenueCharts = chartDays.map((date) => {
      const dataForDay = dailyRevenueData.find((item) => item.date === date)

      return {
        date: dayjs(date).format('DD/MM'),
        fullDate: date,
        bookings: dataForDay?.bookings || 0,
        revenue: dataForDay?.revenue || 0,
      }
    })

    return dataRevenueCharts
  }, [dailyRevenueData])

  const chartRevenue = useChart({
    data: chartData,
    series: [
      { name: 'bookings', color: 'emerald.solid', label: 'Agendamentos' },
      { name: 'revenue', color: 'primary.solid', label: 'Receita' },
    ],
  })

  function verifyNumber<T>(value: T) {
    return typeof value === 'number' ? value : 0
  }

  return {
    chartRevenue,
    verifyNumber,
  }
}
