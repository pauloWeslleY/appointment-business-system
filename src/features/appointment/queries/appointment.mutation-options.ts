import type { QueryClient } from '@tanstack/react-query'
import { mutationOptions } from '@tanstack/react-query'

import { dashboardQueryKeys } from '@/features/dashboard/queries/dashboard.query-key'
import { establishmentQueryKeys } from '@/features/establishment/queries/establishment.query-key'
import { serviceEstablishmentQueryKeys } from '@/features/service-establishment/queries/service-establishment.query-key'

import {
  createAppointmentService,
  updateAppointmentService,
  updateStatusAppointmentService,
} from '../services/appointment.service'
import { appointmentQueryKeys } from './appointment.query-key'

async function invalidateAppointments(client: QueryClient) {
  await Promise.all([
    client.invalidateQueries({ queryKey: appointmentQueryKeys.all() }),
    client.invalidateQueries({ queryKey: serviceEstablishmentQueryKeys.all }),
    client.invalidateQueries({ queryKey: establishmentQueryKeys.all }),
    client.invalidateQueries({ queryKey: dashboardQueryKeys.all }),
  ])
}

export const appointmentMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: ['appointment', 'create'],
      mutationFn: createAppointmentService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateAppointments(context.client)
      },
    }),
  update: () =>
    mutationOptions({
      mutationKey: ['appointment', 'update'],
      mutationFn: updateAppointmentService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateAppointments(context.client)
      },
    }),
  status: () =>
    mutationOptions({
      mutationKey: ['appointment', 'status'],
      mutationFn: updateStatusAppointmentService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateAppointments(context.client)
      },
    }),
}
