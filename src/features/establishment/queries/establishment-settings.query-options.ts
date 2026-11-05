import { queryOptions, skipToken } from '@tanstack/react-query'

import { EstablishmentSettingsScopeSchema } from '../schemas/establishment-settings.schema'
import { getEstablishmentSettingsService } from '../services/establishment-settings.service'
import type { EstablishmentSettingsScope } from '../types/establishment-settings.type'
import { establishmentSettingsQueryKeys } from './establishment-settings.query-key'

export function establishmentSettingsQueryOptions(
  scope: EstablishmentSettingsScope,
) {
  return queryOptions({
    queryKey: establishmentSettingsQueryKeys.detail(scope),
    queryFn: EstablishmentSettingsScopeSchema.safeParse(scope).success
      ? () => getEstablishmentSettingsService(scope)
      : skipToken,
  })
}
