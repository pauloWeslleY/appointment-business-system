import { authClient } from '@/lib/auth'
import { httpDependencies } from '@/shared/factory/http-dependencies'
import { HttpMethod } from '@/shared/protocols'
import { uploadFileToR2 } from '@/shared/services/storage/upload.service'

import { EstablishmentSettingsScopeSchema } from '../schemas/establishment-settings.schema'
import { EstablishmentSettingsApiRequestSchema } from '../schemas/establishment-settings-api-request.schema'
import { EstablishmentSettingsApiResponseSchema } from '../schemas/establishment-settings-api-response.schema'
import { SaveEstablishmentSettingsInputSchema } from '../schemas/establishment-settings-form.schema'
import type { EstablishmentLinksForm } from '../types/establishment-links-form.type'
import type {
  EstablishmentSettingsApiRequest,
  EstablishmentSettingsApiResponse,
  EstablishmentSettingsScope,
  SaveEstablishmentSettingsInput,
} from '../types/establishment-settings.type'

async function assertSettingsSession(
  scope: EstablishmentSettingsScope,
): Promise<void> {
  const { data, error } = await authClient.getSession()
  if (
    error ||
    data?.user.id !== scope.userId ||
    data.session.activeOrganizationId !== scope.organizationId
  ) {
    throw new Error(
      'A sessão ou organização foi alterada. Reabra as configurações.',
    )
  }
}

function isEstablishmentLinksForm(
  settings: SaveEstablishmentSettingsInput['settings'],
): settings is EstablishmentLinksForm {
  return 'requiresBookingDeposit' in settings
}

async function resolvePaymentQrCodeUrl(
  establishmentId: string,
  settings: EstablishmentLinksForm,
): Promise<string | null> {
  if (!settings.qrCodeFile) {
    return settings.paymentQrCodeUrl || null
  }

  const upload = await uploadFileToR2({
    id: establishmentId,
    file: settings.qrCodeFile,
    folder: 'establishment',
  })

  return upload.publicUrl
}

async function toEstablishmentSettingsRequest(
  establishmentId: string,
  settings: SaveEstablishmentSettingsInput['settings'],
): Promise<EstablishmentSettingsApiRequest> {
  if (!isEstablishmentLinksForm(settings)) {
    return {
      primaryColor: settings.primaryColor || null,
      secondaryColor: settings.secondaryColor || null,
      tertiaryColor: settings.tertiaryColor || null,
    }
  }

  return {
    websiteUrl: settings.websiteUrl || null,
    requiresBookingDeposit: settings.requiresBookingDeposit,
    paymentLink: settings.paymentLink || null,
    paymentQrCodeUrl: await resolvePaymentQrCodeUrl(establishmentId, settings),
  }
}

export async function getEstablishmentSettingsService(
  input: EstablishmentSettingsScope,
): Promise<EstablishmentSettingsApiResponse> {
  const scope = EstablishmentSettingsScopeSchema.parse(input)
  await assertSettingsSession(scope)
  const { api, validate } = httpDependencies<unknown>()
  const response = await api.request({
    method: HttpMethod.GET,
    url: '/admin/establishments/by-slug/' + encodeURIComponent(scope.slug),
  })

  const result = EstablishmentSettingsApiResponseSchema.parse(
    validate.errors(response),
  )

  if (
    result.organizationId !== undefined &&
    result.organizationId !== scope.organizationId
  ) {
    throw new Error('O estabelecimento não pertence à organização selecionada.')
  }

  return result
}

export async function saveEstablishmentSettingsService(
  input: SaveEstablishmentSettingsInput,
): Promise<EstablishmentSettingsApiResponse> {
  const { scope, establishmentId, settings } =
    SaveEstablishmentSettingsInputSchema.parse(input)
  await assertSettingsSession(scope)

  const body = EstablishmentSettingsApiRequestSchema.parse(
    await toEstablishmentSettingsRequest(establishmentId, settings),
  )

  await assertSettingsSession(scope)

  const { api, validate } = httpDependencies<unknown>()
  const response = await api.request({
    method: HttpMethod.PATCH,
    url: '/admin/establishments/' + establishmentId,
    body,
  })

  const result = EstablishmentSettingsApiResponseSchema.parse(
    validate.errors(response),
  )

  if (
    (result.organizationId !== undefined &&
      result.organizationId !== scope.organizationId) ||
    result.id !== establishmentId ||
    result.slug !== scope.slug
  ) {
    throw new Error(
      'A resposta não corresponde ao estabelecimento selecionado.',
    )
  }

  return result
}
