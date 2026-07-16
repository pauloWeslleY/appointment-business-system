import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import { fonts } from './fonts'
import { semanticTokens } from './tokens/semantic-tokens'
import { tokens } from './tokens/tokens'

const themeConfig = defineConfig({
  globalCss: {
    '*::-webkit-scrollbar': {
      width: '2',
    },
    '*::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '*::-webkit-scrollbar-thumb': {
      background: {
        base: `${colorDefaultTheme}.600`,
        _dark: `${colorDefaultTheme}.300`,
      },
      borderRadius: 'xl',
    },
    '::-moz-selection': {
      backgroundColor: { base: 'gray.950', _dark: 'gray.50' },
      color: { base: 'gray.100', _dark: 'gray.800' },
    },
    '::selection': {
      backgroundColor: { base: 'gray.300', _dark: 'gray.700' },
      color: {
        base: `${colorDefaultTheme}.800`,
        _dark: `${colorDefaultTheme}.300`,
      },
    },

    body: {
      background: {
        base: `${colorDefaultTheme}.100/60`,
        _dark: `${colorDefaultTheme}.400/10`,
      },
      '--webkit-font-smoothing': 'antialiased',
      textRendering: 'optimizeLegibility',
      height: 'full',
    },

    'html, #root': {
      height: 'full',
    },
  },
  theme: {
    tokens: {
      colors: tokens,
      fonts,
    },
    semanticTokens: {
      colors: semanticTokens,
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

const theme = createSystem(defaultConfig, themeConfig)

export default theme
