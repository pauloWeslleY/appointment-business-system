import { z } from 'zod'

import { EstablishmentColorsFormSchema } from './establishment-colors-form.schema'
import { EstablishmentLinksFormSchema } from './establishment-links-form.schema'
import { EstablishmentSettingsScopeSchema } from './establishment-settings.schema'

export const SaveEstablishmentSettingsInputSchema = z.object({
  scope: EstablishmentSettingsScopeSchema,
  establishmentId: z.uuid(),
  settings: z.union([
    EstablishmentLinksFormSchema,
    EstablishmentColorsFormSchema,
  ]),
})
