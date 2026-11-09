import { useMutation } from '@tanstack/react-query'

import { toaster } from '@/components/ui/toaster'
import { authenticatedContextQueryPrefix } from '@/features/authentication/queries/authentication.query-key'

import { organizationProfileMutationOptions } from '../queries/organization-profile-mutation-options'
import { organizationProfileQueryKeys } from '../queries/organization-profile-query-key'

export function useMutationPatchOrganizationProfile() {
  return useMutation({
    ...organizationProfileMutationOptions.update(),

    onSuccess: async (_response, _variables, _result, context) => {
      await Promise.all([
        context.client.invalidateQueries({
          queryKey: organizationProfileQueryKeys.summary(),
        }),
        context.client.invalidateQueries({
          queryKey: authenticatedContextQueryPrefix(),
        }),
      ])

      toaster.success({
        title: 'Proprietário atualizado com sucesso',
      })
    },

    onError: (error) => {
      toaster.error({
        title: 'Ops!',
        description: error.message || 'Erro ao atualizar proprietário',
      })
    },
  })
}
