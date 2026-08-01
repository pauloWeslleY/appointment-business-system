import { defineStyle } from '@chakra-ui/react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

export const contentCss = defineStyle({
  colorPalette: colorDefaultTheme,
  borderWidth: '1px',
  bg: { base: 'white', _dark: 'secondary.700' },
  borderColor: { base: 'gray.200', _dark: 'secondary.500/20' },
  rounded: 'lg',
})

export const cardCss = defineStyle({
  rounded: 'xl',
  shadow: 'xs',
  bg: { base: 'primary.100/40', _dark: 'primary.800/40' },
  borderColor: { base: 'gray.200', _dark: 'secondary.500/20' },
  p: '2',
})

export const cardSectionCss = defineStyle({
  rounded: 'xl',
  shadow: 'xs',
  bg: { base: 'white', _dark: 'gray.950/40' },
  borderColor: { base: 'gray.200', _dark: 'secondary.500/20' },
  p: '4',
})
