import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

import { appointmentColors } from './tokens/appointment-colors'
import { semanticTokens } from './tokens/semantic-tokens'
import { sidebarColors } from './tokens/sidebar-colors'
import { tokens } from './tokens/tokens'
import { typography } from './tokens/typography'

const themeConfig = defineConfig({
  globalCss: {
    fieldset: {
      minWidth: '0',
    },
    '[data-scope="card"][data-part="root"], [data-scope="fieldset"][data-part="root"]':
      {
        minWidth: '0',
      },
    '[data-scope="data-list"][data-part="item-value"]': {
      minWidth: '0',
      overflowWrap: 'anywhere',
    },
    'button, a[role="button"], [data-scope="menu"][data-part="item"], [data-scope="select"][data-part="item"], [data-scope="radio-group"][data-part="item"], [data-scope="checkbox"][data-part="root"]':
      {
        '@media (pointer: coarse)': {
          minHeight: '11',
        },
      },
    'button[aria-label]': {
      '@media (pointer: coarse)': {
        minWidth: '11',
      },
    },
    'html, #root': {
      minHeight: '100%',
    },

    '*::-webkit-scrollbar': {
      width: '2',
      height: '2',
    },

    '*::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    '*::-webkit-scrollbar-thumb': {
      background: {
        base: 'slate.300',
        _dark: 'slate.700',
      },
      borderRadius: 'full',
    },

    '*::-webkit-scrollbar-thumb:hover': {
      background: {
        base: 'slate.500',
        _dark: 'slate.500',
      },
    },

    '*': {
      scrollbarWidth: 'thin',
      scrollbarColor: {
        base: '{colors.slate.300} transparent',
        _dark: '{colors.slate.700} transparent',
      },
    },

    '::selection': {
      backgroundColor: {
        base: 'brand.mint',
        _dark: 'navy.600',
      },
      color: {
        base: 'brand.navy',
        _dark: 'white',
      },
    },

    body: {
      bg: 'app.bg',
      color: 'app.fg',
      fontFamily: 'body',
      '--webkit-font-smoothing': 'antialiased',
      textRendering: 'optimizeLegibility',
      minHeight: '100vh',
    },

    html: {
      colorPalette: 'brand',
    },
  },
  theme: {
    tokens: {
      colors: tokens,
      fonts: typography.fonts,
    },
    semanticTokens: {
      colors: {
        ...sidebarColors,
        ...semanticTokens,
        ...appointmentColors,
      },
      shadows: {
        shape: {
          value: {
            _light:
              '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            _dark:
              '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
  },
})

const system = createSystem(defaultConfig, themeConfig)

export default system
