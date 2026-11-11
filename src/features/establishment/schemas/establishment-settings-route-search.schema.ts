import { z } from 'zod'

import { MENU_SETTINGS_ESTABLISHMENT } from '../constants/menu-tab-establishment-update'

export const EstablishmentSettingsRouteSearchSchema = z.object({
  tab: z.enum(MENU_SETTINGS_ESTABLISHMENT).optional().catch(undefined),
})
