import type { EstablishmentLinksForm } from '../types/establishment-links-form.type'
import type { EstablishmentSettingsApiResponse } from '../types/establishment-settings.type'

export function getEstablishmentLinksFormValues(
  settings?: EstablishmentSettingsApiResponse,
): EstablishmentLinksForm {
  return {
    websiteUrl: settings?.websiteUrl ?? '',
    requiresBookingDeposit: settings?.requiresBookingDeposit ?? false,
    paymentLink: settings?.paymentLink ?? '',
    paymentQrCodeUrl: settings?.paymentQrCodeUrl ?? '',
    qrCodeFile: null,
  }
}
