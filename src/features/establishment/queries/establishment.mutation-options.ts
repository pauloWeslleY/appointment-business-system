import { mutationOptions } from '@tanstack/react-query'

import { memberQueryKey } from '@/features/members/queries/member.query-key'

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
        await Promise.all([
          context.client.invalidateQueries({
            queryKey: establishmentQueryKeys.lists(),
          }),
          context.client.invalidateQueries({
            queryKey: memberQueryKey.context(),
          }),
        ])
      },
    }),

  update: () =>
    mutationOptions({
      mutationKey: ['update-establishment'],
      mutationFn: updateEstablishmentService,
      onSuccess: async (_data, _variables, _result, context) => {
        await Promise.all([
          context.client.invalidateQueries({
            queryKey: establishmentQueryKeys.all,
          }),
          context.client.invalidateQueries({
            queryKey: memberQueryKey.context(),
          }),
        ])
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
