import { mutationOptions } from '@tanstack/react-query'

import { createOwnerService, updateOwnerService } from '../api/owner.service'

export const ownerMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-owner'],
      mutationFn: createOwnerService,
    })
  },

  update() {
    return mutationOptions({
      mutationKey: ['update-owner'],
      mutationFn: updateOwnerService,
    })
  },
}
