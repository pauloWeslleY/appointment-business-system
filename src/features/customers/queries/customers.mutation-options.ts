import { mutationOptions, type QueryClient } from '@tanstack/react-query'

import {
  createCustomerService,
  updateCustomerService,
  updateCustomerStatusService,
} from '../services/customer.service'
import { customersQueryKeys } from './customers.query-key'
const invalidateCustomers = async (client: QueryClient): Promise<void> => {
  await client.invalidateQueries({ queryKey: customersQueryKeys.all() })
}
export const customersMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: ['customers', 'create'],
      mutationFn: createCustomerService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateCustomers(context.client)
      },
    }),
  update: () =>
    mutationOptions({
      mutationKey: ['customers', 'update'],
      mutationFn: updateCustomerService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateCustomers(context.client)
      },
    }),
  status: () =>
    mutationOptions({
      mutationKey: ['customers', 'status'],
      mutationFn: updateCustomerStatusService,
      onSuccess: async (_data, _variables, _result, context) => {
        await invalidateCustomers(context.client)
      },
    }),
}
