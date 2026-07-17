import { mutationOptions } from '@tanstack/react-query'

import {
  createEstablishmentService,
  updateEstablishmentService,
} from '../api/establishment.service'

export const establishmentMutationOptions = {
  create() {
    return mutationOptions({
      mutationKey: ['create-establishment'],
      mutationFn: createEstablishmentService,
    })
  },

  update() {
    return mutationOptions({
      mutationKey: ['update-establishment'],
      mutationFn: updateEstablishmentService,
    })
  },
}
