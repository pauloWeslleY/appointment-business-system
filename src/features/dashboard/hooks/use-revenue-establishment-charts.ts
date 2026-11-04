import { useChart } from '@chakra-ui/charts'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import type { RevenueDashboardApiResponse } from '../types/get-revenue-dashboard.api.type'

export function useRevenueEstablishmentCharts(
  dailyRevenue: RevenueDashboardApiResponse,
) {
  const chartData = useMemo(
    () =>
      dailyRevenue.map((item) => ({
        date: dayjs(item.date).format('DD/MM'),
        fullDate: item.date,
        appointments: item.appointments,
        revenue: item.revenue,
      })),
    [dailyRevenue],
  )

  const chartRevenue = useChart({
    data: chartData,
    series: [
      { name: 'appointments', color: 'emerald.solid', label: 'Agendamentos' },
      { name: 'revenue', color: 'primary.solid', label: 'Receita' },
    ],
  })

  const revenueIfExists = chartData.some(
    (item) => item.revenue > 0 || item.appointments > 0,
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
