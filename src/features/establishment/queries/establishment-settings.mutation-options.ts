import { mutationOptions } from '@tanstack/react-query'

import { establishmentQueryKeys } from '@/features/establishment/queries/establishment.query-key'

import { saveEstablishmentSettingsService } from '../services/establishment-settings.service'
import { establishmentSettingsQueryKeys } from './establishment-settings.query-key'

export function saveEstablishmentSettingsMutationOptions() {
  return mutationOptions({
    mutationKey: [...establishmentSettingsQueryKeys.all, 'update'],
    mutationFn: saveEstablishmentSettingsService,
    onSuccess: async (data, variables, _result, context) => {
      context.client.setQueryData(
        establishmentSettingsQueryKeys.detail(variables.scope),
        data,
      )

      await context.client.invalidateQueries({
        queryKey: establishmentQueryKeys.all,
      })
    },
  })
}
