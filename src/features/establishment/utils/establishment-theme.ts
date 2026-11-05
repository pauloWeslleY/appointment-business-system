import { tokens } from '@/theme/tokens/tokens'

import { EstablishmentHexColorSchema } from '../schemas/establishment-settings.schema'
import type {
  EstablishmentThemeColors,
  EstablishmentThemeStyle,
} from '../types/establishment-theme.type'

export const defaultEstablishmentColors = {
  primaryColor: tokens.primary[500].value,
  secondaryColor: tokens.secondary[500].value,
  tertiaryColor: tokens.tertiary[500].value,
}

function mixColor(color: string, weight: number, target: number): string {
  return (
    '#' +
    [1, 3, 5]
      .map((offset) =>
        Math.round(
          parseInt(color.slice(offset, offset + 2), 16) * (1 - weight) +
            target * weight,
        )
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  )
}

export function colorContrast(color: string): string {
  const rgb = [1, 3, 5].map((offset) => {
    const channel = parseInt(color.slice(offset, offset + 2), 16) / 255
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  })

  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722 > 0.179
    ? '#000000'
    : '#ffffff'
}

function colorPalette(color: string): Record<number, string> {
  return {
    50: mixColor(color, 0.96, 255),
    100: mixColor(color, 0.9, 255),
    200: mixColor(color, 0.75, 255),
    300: mixColor(color, 0.55, 255),
    400: mixColor(color, 0.25, 255),
    500: color,
    600: mixColor(color, 0.15, 0),
    700: mixColor(color, 0.3, 0),
    800: mixColor(color, 0.5, 0),
    900: mixColor(color, 0.7, 0),
    950: mixColor(color, 0.85, 0),
  }
}

export function establishmentThemeStyle(
  colors: EstablishmentThemeColors,
  mode: 'light' | 'dark',
): EstablishmentThemeStyle {
  const result: EstablishmentThemeStyle = {}
  const dark = mode === 'dark'
  const groups = [
    { field: 'primaryColor', names: ['primary', 'navy'], brand: 'navy' },
    { field: 'secondaryColor', names: ['secondary', 'slate'], brand: 'slate' },
    {
      field: 'tertiaryColor',
      names: ['tertiary', 'sea', 'emerald'],
      brand: 'sea',
    },
  ] as const
  for (const group of groups) {
    const color = colors[group.field]
    if (!color || !EstablishmentHexColorSchema.safeParse(color).success) {
      continue
    }

    const palette = colorPalette(color)
    for (const name of group.names) {
      for (const [shade, value] of Object.entries(palette)) {
        result[`--chakra-colors-${name}-${shade}`] = value
      }

      const solid = dark ? palette[300] : palette[900]
      const roles = {
        fg: dark ? palette[200] : palette[800],
        subtle: dark ? palette[900] : palette[100],
        muted: dark ? palette[800] : palette[200],
        emphasized: dark ? palette[700] : palette[300],
        solid,
        contrast: colorContrast(solid),
        'focus-ring': palette[400],
        border: dark ? palette[800] : palette[200],
      }
      for (const [role, value] of Object.entries(roles)) {
        result[`--chakra-colors-${name}-${role}`] = value
      }
    }
    result[`--chakra-colors-brand-${group.brand}`] = color
    if (group.field === 'tertiaryColor') {
      result['--chakra-colors-brand-mint'] = palette[100]
    }
  }

  if (Object.keys(result).length) {
    result['--chakra-colors-sidebar-content-bg'] = dark
      ? 'var(--chakra-colors-secondary-900)'
      : 'var(--chakra-colors-navy-50)'
    result['--chakra-colors-sidebar-aside-bg'] = dark
      ? 'var(--chakra-colors-navy-900)'
      : '#ffffff'
    result['--chakra-colors-sidebar-item-color'] = dark
      ? 'var(--chakra-colors-slate-100)'
      : 'var(--chakra-colors-slate-700)'
    result['--chakra-colors-sidebar-item-hover-bg'] = dark
      ? 'var(--chakra-colors-navy-700)'
      : 'var(--chakra-colors-navy-100)'
    result['--chakra-colors-sidebar-item-hover-fg'] = dark
      ? '#ffffff'
      : 'var(--chakra-colors-slate-700)'
    result['--chakra-colors-sidebar-item-active-bg'] = dark
      ? 'var(--chakra-colors-sea-800)'
      : 'var(--chakra-colors-sea-100)'
    result['--chakra-colors-sidebar-item-active-fg'] = dark
      ? '#ffffff'
      : 'var(--chakra-colors-slate-700)'
  }

  return result
}
