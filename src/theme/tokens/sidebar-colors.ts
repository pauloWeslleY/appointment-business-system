import { defineSemanticTokens } from '@chakra-ui/react'

export const sidebarColors = defineSemanticTokens.colors({
  sidebar: {
    content: {
      bg: {
        value: {
          _light: '{colors.navy.50}',
          _dark: '{colors.secondary.900}',
        },
      },
    },
    aside: {
      bg: {
        value: {
          _light: '{colors.white}',
          _dark: '{colors.navy.900}',
        },
      },
    },
    item: {
      bg: {
        value: {
          _light: 'transparent',
          _dark: 'transparent',
        },
      },
      color: {
        value: {
          _light: '{colors.slate.700}',
          _dark: '{colors.slate.100}',
        },
      },
      hover: {
        bg: {
          value: {
            _light: '{colors.navy.100}',
            _dark: '{colors.navy.700}',
          },
        },
        fg: {
          value: {
            _light: '{colors.slate.700}',
            _dark: '{colors.white}',
          },
        },
      },
      active: {
        bg: {
          value: {
            _light: '{colors.sea.100}',
            _dark: '{colors.sea.800/30}',
          },
        },
        fg: {
          value: {
            _light: '{colors.slate.700}',
            _dark: '{colors.white}',
          },
        },
      },
    },
  },
})
