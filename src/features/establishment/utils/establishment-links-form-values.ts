import type { EstablishmentLinksForm } from '../types/establishment-links-form.type'
import type { EstablishmentSettingsApiResponse } from '../types/establishment-settings.type'

export function getEstablishmentLinksFormValues(
  settings?: EstablishmentSettingsApiResponse,
): EstablishmentLinksForm {
  return {
    websiteUrl: settings?.websiteUrl ?? '',
    instagram: settings?.instagram ?? '',
    facebook: settings?.facebook ?? '',
    whatsapp: settings?.whatsapp ?? '',
    requiresBookingDeposit: settings?.requiresBookingDeposit ?? false,
    paymentLink: settings?.paymentLink ?? '',
    paymentQrCodeUrl: settings?.paymentQrCodeUrl ?? '',
    qrCodeFile: null,
  }
}
