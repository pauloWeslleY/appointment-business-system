import { mutationOptions, type QueryClient } from '@tanstack/react-query'

import { establishmentQueryKeys } from '@/features/establishment/queries/establishment.query-key'

import {
  createOpeningHoursService,
  deleteOpeningHoursService,
  updateOpeningHoursService,
} from '../services/opening-hours.service'
import { openingHoursQueryKeys } from './opening-hours.query-key'

const invalidateOpeningHoursQueries = async (
  client: QueryClient,
): Promise<void> => {
  await Promise.all([
    client.invalidateQueries({ queryKey: openingHoursQueryKeys.all }),
    client.invalidateQueries({ queryKey: establishmentQueryKeys.all }),
  ])
}

export const openingHoursMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: [...openingHoursQueryKeys.all, 'create'],
      mutationFn: createOpeningHoursService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateOpeningHoursQueries(context.client)
      },
    }),

  update: () =>
    mutationOptions({
      mutationKey: [...openingHoursQueryKeys.all, 'update'],
      mutationFn: updateOpeningHoursService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateOpeningHoursQueries(context.client)
      },
    }),

  delete: () =>
    mutationOptions({
      mutationKey: [...openingHoursQueryKeys.all, 'delete'],
      mutationFn: deleteOpeningHoursService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateOpeningHoursQueries(context.client)
      },
    }),
}
