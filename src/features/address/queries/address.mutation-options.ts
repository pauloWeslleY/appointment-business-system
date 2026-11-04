import { mutationOptions, type QueryClient } from '@tanstack/react-query'

import { establishmentQueryKeys } from '@/features/establishment/queries/establishment.query-key'

import {
  createAddressService,
  deleteAddressService,
  updateAddressService,
} from '../services/address.service'
import { addressQueryKeys } from './address.query-key'

const invalidateAddressQueries = async (client: QueryClient): Promise<void> => {
  await Promise.all([
    client.invalidateQueries({ queryKey: addressQueryKeys.all }),
    client.invalidateQueries({ queryKey: establishmentQueryKeys.all }),
  ])
}

export const addressMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: [...addressQueryKeys.all, 'create'],
      mutationFn: createAddressService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateAddressQueries(context.client)
      },
    }),

  update: () =>
    mutationOptions({
      mutationKey: [...addressQueryKeys.all, 'update'],
      mutationFn: updateAddressService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateAddressQueries(context.client)
      },
    }),

  delete: () =>
    mutationOptions({
      mutationKey: [...addressQueryKeys.all, 'delete'],
      mutationFn: deleteAddressService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateAddressQueries(context.client)
      },
    }),
}
