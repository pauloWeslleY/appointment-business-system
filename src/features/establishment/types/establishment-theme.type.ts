import type { CSSProperties } from 'react'

import type { EstablishmentSettings } from './establishment-settings.type'

export type EstablishmentThemeColors = Partial<
  Pick<
    EstablishmentSettings,
    'primaryColor' | 'secondaryColor' | 'tertiaryColor'
  >
>

export interface EstablishmentThemeStyle extends CSSProperties {
  [property: `--chakra-colors-${string}`]: string | undefined
}
