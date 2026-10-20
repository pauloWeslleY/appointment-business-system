import { defineSemanticTokens } from '@chakra-ui/react'

export const semanticTokens = defineSemanticTokens.colors({
  primary: {
    contrast: {
      value: { _light: '{colors.white}', _dark: '{colors.white}' },
    },
    fg: {
      value: { _light: '{colors.primary.800}', _dark: '{colors.primary.200}' },
    },
    subtle: {
      value: { _light: '{colors.primary.100}', _dark: '{colors.primary.900}' },
    },
    muted: {
      value: { _light: '{colors.primary.200}', _dark: '{colors.primary.800}' },
    },
    emphasized: {
      value: { _light: '{colors.primary.300}', _dark: '{colors.primary.700}' },
    },
    solid: {
      value: { _light: '{colors.primary.900}', _dark: '{colors.primary.300}' },
    },
    focusRing: {
      value: { _light: '{colors.primary.400}', _dark: '{colors.primary.400}' },
    },
    border: {
      value: { _light: '{colors.primary.200}', _dark: '{colors.primary.800}' },
    },
  },
  secondary: {
    contrast: {
      value: { _light: '{colors.white}', _dark: '{colors.white}' },
    },
    fg: {
      value: {
        _light: '{colors.secondary.800}',
        _dark: '{colors.secondary.200}',
      },
    },
    subtle: {
      value: {
        _light: '{colors.secondary.100}',
        _dark: '{colors.secondary.900}',
      },
    },
    muted: {
      value: {
        _light: '{colors.secondary.200}',
        _dark: '{colors.secondary.800}',
      },
    },
    emphasized: {
      value: {
        _light: '{colors.secondary.300}',
        _dark: '{colors.secondary.700}',
      },
    },
    solid: {
      value: {
        _light: '{colors.secondary.900}',
        _dark: '{colors.secondary.300}',
      },
    },
    focusRing: {
      value: {
        _light: '{colors.secondary.400}',
        _dark: '{colors.secondary.400}',
      },
    },
    border: {
      value: {
        _light: '{colors.secondary.200}',
        _dark: '{colors.secondary.800}',
      },
    },
  },
  tertiary: {
    contrast: {
      value: {
        _light: '{colors.tertiary.900}',
        _dark: '{colors.tertiary.900}',
      },
    },
    fg: {
      value: {
        _light: '{colors.tertiary.800}',
        _dark: '{colors.tertiary.200}',
      },
    },
    subtle: {
      value: {
        _light: '{colors.tertiary.100}',
        _dark: '{colors.tertiary.900}',
      },
    },
    muted: {
      value: {
        _light: '{colors.tertiary.200}',
        _dark: '{colors.tertiary.800}',
      },
    },
    emphasized: {
      value: {
        _light: '{colors.tertiary.300}',
        _dark: '{colors.tertiary.700}',
      },
    },
    solid: {
      value: {
        _light: '{colors.tertiary.500}',
        _dark: '{colors.tertiary.300}',
      },
    },
    focusRing: {
      value: {
        _light: '{colors.tertiary.400}',
        _dark: '{colors.tertiary.400}',
      },
    },
    border: {
      value: {
        _light: '{colors.tertiary.200}',
        _dark: '{colors.tertiary.800}',
      },
    },
  },
  emerald: {
    contrast: {
      value: { _light: '{colors.emerald.900}', _dark: '{colors.emerald.900}' },
    },
    fg: {
      value: { _light: '{colors.emerald.800}', _dark: '{colors.emerald.200}' },
    },
    subtle: {
      value: { _light: '{colors.emerald.100}', _dark: '{colors.emerald.900}' },
    },
    muted: {
      value: { _light: '{colors.emerald.200}', _dark: '{colors.emerald.800}' },
    },
    emphasized: {
      value: { _light: '{colors.emerald.300}', _dark: '{colors.emerald.700}' },
    },
    solid: {
      value: { _light: '{colors.emerald.500}', _dark: '{colors.emerald.300}' },
    },
    focusRing: {
      value: { _light: '{colors.emerald.400}', _dark: '{colors.emerald.400}' },
    },
    border: {
      value: { _light: '{colors.emerald.200}', _dark: '{colors.emerald.800}' },
    },
  },

  brand: {
    solid: {
      value: {
        base: '{colors.navy.700}',
        _dark: '{colors.sea.400}',
      },
    },
    contrast: {
      value: {
        base: '#FFFFFF',
        _dark: '{colors.navy.950}',
      },
    },
    fg: {
      value: {
        base: '{colors.navy.700}',
        _dark: '{colors.sea.300}',
      },
    },
    muted: {
      value: {
        base: '{colors.navy.100}',
        _dark: '{colors.navy.800}',
      },
    },
    subtle: {
      value: {
        base: '{colors.navy.50}',
        _dark: '{colors.navy.900}',
      },
    },
    emphasized: {
      value: {
        base: '{colors.navy.200}',
        _dark: '{colors.navy.700}',
      },
    },
    focusRing: {
      value: {
        base: '{colors.sea.700}',
        _dark: '{colors.sea.400}',
      },
    },
  },

  app: {
    bg: {
      value: {
        base: '#F8FAFC',
        _dark: '#151121',
      },
    },
    surface: {
      value: {
        base: '#FFFFFF',
        _dark: '#241D35',
      },
    },
    fg: {
      value: {
        base: '{colors.brand.navy}',
        _dark: '#F8F6FC',
      },
    },
    fgMuted: {
      value: {
        base: '{colors.brand.slate}',
        _dark: '#B7AFC6',
      },
    },
    border: {
      value: {
        base: '#E2E8F0',
        _dark: '#413550',
      },
    },
    primary: {
      value: {
        base: '{colors.brand.navy}',
        _dark: '{colors.brand.sea}',
      },
    },
    primaryFg: {
      value: {
        base: '#FFFFFF',
        _dark: '#151121',
      },
    },
    accent: {
      value: {
        base: '{colors.brand.mint}',
        _dark: '{colors.brand.navy}',
      },
    },
  },
})
