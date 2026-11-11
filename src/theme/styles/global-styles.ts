import { defineStyle } from '@chakra-ui/react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

export const contentCss = defineStyle({
  minW: '0',
  overflowWrap: 'anywhere',
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
  minW: '0',
  overflowWrap: 'anywhere',
  rounded: 'xl',
  shadow: 'xs',
  bg: { _light: 'primary.100/40', _dark: 'primary.800/40' },
  borderColor: { _light: 'gray.200', _dark: 'secondary.500/20' },
  p: '2',
})

export const cardSectionCss = defineStyle({
  minW: '0',
  overflowWrap: 'anywhere',
  shadow: 'xs',
  rounded: 'xl',
  p: { base: '2', md: '4' },
  bg: { _light: 'white', _dark: 'slate.900/60' },
  borderColor: { _light: 'gray.200', _dark: 'slate.800/80' },
})

export const inputStyles = defineStyle({
  rounded: 'lg',
  borderColor: { _light: 'slate.400', _dark: 'slate.600' },
})

export const inputFieldStyles = defineStyle({
  minW: '0',
  maxW: 'full',
  rounded: 'xl',
  bg: { _light: 'blackAlpha.100', _dark: 'gray.950/40' },
})

export const cssTableColumns = defineStyle({
  color: { _light: 'sea.600', _dark: 'sea.500' },
})

export const cssTableRows = defineStyle({
  bg: { _light: 'slate.100', _dark: 'slate.950/80' },
})
