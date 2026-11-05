import { mutationOptions } from '@tanstack/react-query'

import {
  createProfessionalFromForm,
  updateProfessionalFromForm,
} from '../services/professional-form.service'
import { professionalsQueryKeys } from './professionals.query-key'

export const professionalsMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: ['professionals', 'create'],
      mutationFn: createProfessionalFromForm,
      onSuccess: async (_data, _variables, _result, context) => {
        await context.client.invalidateQueries({
          queryKey: professionalsQueryKeys.all,
        })
      },
    }),
  update: () =>
    mutationOptions({
      mutationKey: ['professionals', 'update'],
      mutationFn: updateProfessionalFromForm,
      onSettled: async (_data, _error, _variables, _result, context) => {
        await context.client.invalidateQueries({
          queryKey: professionalsQueryKeys.all,
        })
      },
    }),
}
