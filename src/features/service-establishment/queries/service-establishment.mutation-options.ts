import { mutationOptions } from '@tanstack/react-query'

import { dashboardQueryKeys } from '@/features/dashboard/queries/dashboard.query-key'
import { establishmentQueryKeys } from '@/features/establishment/queries/establishment.query-key'

import {
  createServiceEstablishmentFromForm,
  statusServiceEstablishmentService,
  updateServiceEstablishmentFromForm,
} from '../services/service-establishment.service'
import { serviceEstablishmentQueryKeys } from './service-establishment.query-key'

export const serviceEstablishmentMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: ['service-establishment', 'create'],
      mutationFn: createServiceEstablishmentFromForm,
      onSuccess: async (_data, _variables, _result, context) => {
        await Promise.all([
          context.client.invalidateQueries({
            queryKey: serviceEstablishmentQueryKeys.all,
          }),
          context.client.invalidateQueries({
            queryKey: establishmentQueryKeys.all,
          }),
          context.client.invalidateQueries({
            queryKey: dashboardQueryKeys.all,
          }),
        ])
      },
    }),
  update: () =>
    mutationOptions({
      mutationKey: ['service-establishment', 'update'],
      mutationFn: updateServiceEstablishmentFromForm,
      onSuccess: async (_data, _variables, _result, context) => {
        await Promise.all([
          context.client.invalidateQueries({
            queryKey: serviceEstablishmentQueryKeys.all,
          }),
          context.client.invalidateQueries({
            queryKey: establishmentQueryKeys.all,
          }),
          context.client.invalidateQueries({
            queryKey: dashboardQueryKeys.all,
          }),
        ])
      },
    }),
  status: () =>
    mutationOptions({
      mutationKey: ['service-establishment', 'status'],
      mutationFn: statusServiceEstablishmentService,
      onSuccess: async (_data, _variables, _result, context) => {
        await Promise.all([
          context.client.invalidateQueries({
            queryKey: serviceEstablishmentQueryKeys.all,
          }),
          context.client.invalidateQueries({
            queryKey: establishmentQueryKeys.all,
          }),
          context.client.invalidateQueries({
            queryKey: dashboardQueryKeys.all,
          }),
        ])
      },
    }),
}
