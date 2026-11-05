import type { EstablishmentColorsForm } from '../types/establishment-colors-form.type'
import type { EstablishmentSettingsApiResponse } from '../types/establishment-settings.type'

export function getEstablishmentColorsFormValues(
  settings?: EstablishmentSettingsApiResponse,
): EstablishmentColorsForm {
  return {
    primaryColor: settings?.primaryColor ?? '',
    secondaryColor: settings?.secondaryColor ?? '',
    tertiaryColor: settings?.tertiaryColor ?? '',
  }
}
