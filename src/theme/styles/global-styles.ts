import { defineStyle } from '@chakra-ui/react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

export const contentCss = defineStyle({
  colorPalette: colorDefaultTheme,
  bg: { _light: 'white', _dark: 'secondary.700' },
  borderWidth: '1px',
  borderColor: { _light: 'gray.200', _dark: 'secondary.500/20' },
  rounded: 'lg',
})

export const menuItemCss = defineStyle({
  rounded: 'lg',
  cursor: 'pointer',
  _hover: {
    bg: { _light: 'gray.100', _dark: 'secondary.600' },
  },
})

export const cardCss = defineStyle({
  rounded: 'xl',
  shadow: 'xs',
  bg: { _light: 'primary.100/40', _dark: 'primary.800/40' },
  borderColor: { _light: 'gray.200', _dark: 'secondary.500/20' },
  p: '2',
})

export const cardSectionCss = defineStyle({
  rounded: 'xl',
  shadow: 'xs',
  bg: { _light: 'white', _dark: 'gray.950/40' },
  borderColor: { _light: 'gray.200', _dark: 'secondary.500/20' },
  p: { base: '2', md: '4' },
})

export const inputStyles = defineStyle({
  rounded: 'lg',
  borderColor: { _light: 'slate.400', _dark: 'slate.600' },
})
