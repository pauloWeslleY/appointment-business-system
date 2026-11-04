import { mutationOptions } from '@tanstack/react-query'

import {
  createEstablishmentService,
  updateEstablishmentService,
  uploadEstablishmentImage,
} from '../services/establishment.service'
import { establishmentQueryKeys } from './establishment.query-key'

export const establishmentMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: ['create-establishment'],
      mutationFn: createEstablishmentService,
      onSuccess: async (_data, _variables, _result, context) => {
        await context.client.invalidateQueries({
          queryKey: establishmentQueryKeys.lists(),
        })
      },
    }),

  update: () =>
    mutationOptions({
      mutationKey: ['update-establishment'],
      mutationFn: updateEstablishmentService,
      onSuccess: async (_data, _variables, _result, context) => {
        await context.client.invalidateQueries({
          queryKey: establishmentQueryKeys.all,
        })
      },
    }),

  uploadImage: () =>
    mutationOptions({
      mutationKey: ['upload-establishment-image'],
      mutationFn: uploadEstablishmentImage,
      onSuccess: async (_data, _variables, _result, context) => {
        await context.client.invalidateQueries({
          queryKey: establishmentQueryKeys.all,
        })
      },
    }),
}
