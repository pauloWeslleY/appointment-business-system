import type { EstablishmentSettingsScope } from '../types/establishment-settings.type'
import { establishmentQueryKeys } from './establishment.query-key'

export const establishmentSettingsQueryKeys = {
  all: [...establishmentQueryKeys.all, 'settings'] as const,
  detail: (scope: EstablishmentSettingsScope) =>
    [
      ...establishmentSettingsQueryKeys.all,
      scope.userId,
      scope.organizationId,
      scope.slug,
    ] as const,
}
