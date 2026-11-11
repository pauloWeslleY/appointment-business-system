import dayjs from 'dayjs'
import { z } from 'zod'

const currentOverviewDate = dayjs()

const defaultOverviewDateRange = {
  from: currentOverviewDate.format('YYYY-MM-DD'),
  to: currentOverviewDate.add(1, 'month').format('YYYY-MM-DD'),
}

export const DashboardOverviewRouteSearchSchema = z.object({
  to: z.string().optional().default(defaultOverviewDateRange.to),
  from: z.string().optional().default(defaultOverviewDateRange.from),
})
