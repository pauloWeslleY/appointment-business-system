import type { z } from 'zod'

import type {
  EstablishmentSettingsSchema,
  EstablishmentSettingsScopeSchema,
} from '../schemas/establishment-settings.schema'
import type { EstablishmentSettingsApiRequestSchema } from '../schemas/establishment-settings-api-request.schema'
import type { EstablishmentSettingsApiResponseSchema } from '../schemas/establishment-settings-api-response.schema'
import type { SaveEstablishmentSettingsInputSchema } from '../schemas/establishment-settings-form.schema'

export type EstablishmentSettings = z.infer<typeof EstablishmentSettingsSchema>

export type EstablishmentSettingsApiResponse = z.infer<
  typeof EstablishmentSettingsApiResponseSchema
>

export type EstablishmentSettingsApiRequest = z.infer<
  typeof EstablishmentSettingsApiRequestSchema
>

export type EstablishmentSettingsScope = z.infer<
  typeof EstablishmentSettingsScopeSchema
>

export type SaveEstablishmentSettingsInput = z.infer<
  typeof SaveEstablishmentSettingsInputSchema
>
