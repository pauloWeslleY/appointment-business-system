import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toaster } from '@/components/ui/toaster'

import { organizationProfileMutationOptions } from '../queries/organization-profile-mutation-options'
import { organizationProfileQueryKeys } from '../queries/organization-profile-query-key'

export function useMutationPatchOrganizationProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    ...organizationProfileMutationOptions.update(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationProfileQueryKeys.summary(),
      })
      toaster.success({ title: 'Proprietário atualizado com sucesso' })
    },
    onError: (error) => {
      toaster.error({
        title: error.message || 'Erro ao atualizar proprietário',
      })
    },
  })
}
