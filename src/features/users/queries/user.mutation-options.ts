import { mutationOptions } from '@tanstack/react-query'

import { authenticationQueryKey } from '@/features/authentication/queries/authentication.query-key'

import { changePasswordService } from '../services/change-password.service'

export const userMutationOptions = {
  changePassword: () =>
    mutationOptions({
      mutationKey: ['users', 'change-password'],
      mutationFn: changePasswordService,
      gcTime: 0,
      retry: false,
      onSuccess: async (_data, _variables, _result, { client }) => {
        await client.invalidateQueries({
          queryKey: authenticationQueryKey.session(),
          refetchType: 'none',
        })
      },
    }),
}
