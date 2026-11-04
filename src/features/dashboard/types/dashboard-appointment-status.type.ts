import type { ColorPalette } from '@chakra-ui/react'

import type { DashboardAppointmentStatus } from './dashboard-query.api.type'

interface DashboardAppointmentStatusLabel {
  label: string
  color: ColorPalette
}

export const dashboardAppointmentStatusLabels: Record<
  DashboardAppointmentStatus,
  DashboardAppointmentStatusLabel
> = {
  pending: { label: 'Pendente', color: 'yellow' },
  confirmed: { label: 'Confirmado', color: 'blue' },
  concluded: { label: 'Concluído', color: 'green' },
  cancelled: { label: 'Cancelado', color: 'red' },
}
