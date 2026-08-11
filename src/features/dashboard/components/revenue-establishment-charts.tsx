import { Chart } from '@chakra-ui/charts'
import dayjs from 'dayjs'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import { useRevenueEstablishmentCharts } from '../hooks/use-revenue-establishment-charts'
import type { RevenueEstablishmentModel } from '../types/revenue-establishment.model'

interface RevenueEstablishmentChartsProps {
  revenue: RevenueEstablishmentModel[]
}

const RevenueEstablishmentCharts = ({
  revenue,
}: RevenueEstablishmentChartsProps) => {
  const { chartRevenue, verifyNumber } = useRevenueEstablishmentCharts(revenue)

  return (
    <Chart.Root maxH={{ base: '300px', xl: '360px' }} chart={chartRevenue}>
      <BarChart data={chartRevenue.data} responsive>
        <CartesianGrid
          stroke={chartRevenue.color('border.muted')}
          vertical={false}
        />

        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chartRevenue.key('date')}
          interval="preserveStartEnd"
          minTickGap={24}
          tickMargin={8}
        />

        <YAxis
          yAxisId="left"
          axisLine={false}
          tickLine={false}
          width={40}
          tickFormatter={(value) => String(value)}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tickLine={false}
          width={60}
          tickFormatter={(value) => formatCurrencyInCents(Number(value))}
        />

        <Tooltip
          cursor={{ fill: chartRevenue.color('bg.muted') }}
          animationDuration={100}
          content={
            <Chart.Tooltip
              formatter={(value, name) => {
                if (name === 'Receita') {
                  const revenue =
                    typeof value === 'number' ? value : Number(value ?? 0)

                  return formatCurrencyInCents(revenue)
                }

                return String(value)
              }}
              labelFormatter={(label, payload) => {
                const full = payload?.[0]?.payload?.fullDate
                return full ? dayjs(full).format('DD/MM/YYYY') : label
              }}
            />
          }
        />
        <Legend content={<Chart.Legend />} />

        {chartRevenue.series.map((item) => (
          <Bar
            isAnimationActive={false}
            key={item.name}
            dataKey={chartRevenue.key(item.name)}
            fill={chartRevenue.color(item.color)}
            stroke={chartRevenue.color(item.color)}
            yAxisId={item.name === 'revenue' ? 'right' : 'left'}
          >
            <LabelList
              dataKey={chartRevenue.key(item.name)}
              position="top"
              formatter={(label) => {
                const revenue =
                  typeof label === 'number' ? label : Number(label ?? 0)

                return item.name === 'revenue'
                  ? formatCurrencyInCents(revenue)
                  : String(revenue)
              }}
              style={{ fontWeight: 600, fill: chartRevenue.color('fg') }}
              content={({ x = 0, y = 0, width = 0, value, textAnchor }) => {
                const n = verifyNumber(value ?? 0)

                if (!Number.isFinite(n) || Math.abs(n) < 0.01) return null

                const shift = item.name === 'revenue' ? +8 : -8
                const text =
                  item.name === 'revenue' ? formatCurrencyInCents(n) : String(n)
                const verifyWidth = verifyNumber(width)
                const positionY = verifyNumber(y)
                const positionX = verifyNumber(x)
                const posY = positionY - 6
                const posX = positionX + verifyWidth / 2 + shift

                return (
                  <text
                    x={posX}
                    y={posY}
                    textAnchor={textAnchor ?? 'middle'}
                    fontWeight={600}
                    fill={chartRevenue.color('fg')}
                  >
                    {text}
                  </text>
                )
              }}
            />
          </Bar>
        ))}
      </BarChart>
    </Chart.Root>
  )
}

export default RevenueEstablishmentCharts
