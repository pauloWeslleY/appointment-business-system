import { mutationOptions } from '@tanstack/react-query'

import {
  createCustomerService,
  statusCustomerService,
  updateCustomerService,
} from '../services/customer.services'

export const customersMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-customer'],
      mutationFn: createCustomerService,
    })
  },

  update() {
    return mutationOptions({
      mutationKey: ['update-customer'],
      mutationFn: updateCustomerService,
    })
  },

  status() {
    return mutationOptions({
      mutationKey: ['status-customer'],
      mutationFn: statusCustomerService,
    })
  },
}
