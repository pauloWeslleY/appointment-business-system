import { defineStyle } from '@chakra-ui/react'

export const pageCardCss = defineStyle({
  position: 'relative',
  overflow: 'hidden',
  w: 'full',
  minW: '0',
  rounded: '2xl',
  borderWidth: '1px',
  shadow: 'sm',
  px: { base: '6', md: '12' },
  py: { base: '8', md: '12' },
  bg: { _light: 'secondary.100', _dark: 'primary.900' },
  borderColor: { _light: 'secondary.200', _dark: 'primary.700' },
})

export const pageCodeCss = defineStyle({
  fontSize: { base: '6xl', md: '8xl' },
  fontWeight: 'extrabold',
  lineHeight: '1',
  letterSpacing: 'tight',
  color: { _light: 'primary.600', _dark: 'white' },
})

export const pageTitleCss = defineStyle({
  fontSize: { base: 'xl', md: '2xl' },
  fontWeight: 'bold',
  color: { _light: 'primary.600', _dark: 'white' },
})

export const pageDescriptionCss = defineStyle({
  maxW: 'md',
  fontSize: { base: 'sm', md: 'md' },
  color: { _light: 'secondary.500', _dark: 'secondary.300' },
})

export const pagePrimaryActionCss = defineStyle({
  rounded: 'lg',
  fontWeight: 'semibold',
  bg: 'emerald.400',
  color: 'primary.700',
  _hover: { bg: 'emerald.500' },
})

export const pageSecondaryActionCss = defineStyle({
  px: '0',
  fontWeight: 'medium',
  color: { _light: 'primary.600', _dark: 'emerald.400' },
  _hover: { textDecoration: 'underline' },
})

export const pageIllustrationCss = defineStyle({
  position: 'relative',
  zIndex: '1',
  flexShrink: '0',
  boxSize: { base: '48', md: '64' },
  objectFit: 'contain',
})

// Fora do fluxo do flex do card, para não contar como item no space-between.
export const pageBackgroundShapesCss = defineStyle({
  position: 'absolute',
  inset: '0',
  zIndex: '0',
  pointerEvents: 'none',
})

// Formas decorativas do fundo do card; ficam atrás do conteúdo (zIndex 0).
const pageBackgroundShapeCss = defineStyle({
  position: 'absolute',
  zIndex: '0',
  rounded: 'full',
  pointerEvents: 'none',
})

export const pageBackgroundTopShapeCss = defineStyle({
  ...pageBackgroundShapeCss,
  top: { base: '-28', md: '-36' },
  right: { base: '-12', md: '10' },
  boxSize: { base: '56', md: '72' },
  bg: { _light: 'emerald.400', _dark: 'emerald.500' },
  opacity: { _light: '0.55', _dark: '0.35' },
})

export const pageBackgroundSideShapeCss = defineStyle({
  ...pageBackgroundShapeCss,
  top: { base: '16', md: '14' },
  right: { base: '-32', md: '-36' },
  boxSize: { base: '56', md: '64' },
  bgGradient: 'to-b',
  gradientFrom: { _light: 'primary.500', _dark: 'primary.600' },
  gradientTo: { _light: 'primary.700', _dark: 'primary.800' },
})

export const pageBackgroundBottomShapeCss = defineStyle({
  ...pageBackgroundShapeCss,
  bottom: { base: '-36', md: '-40' },
  right: { base: '10', md: '32' },
  boxSize: { base: '60', md: '72' },
  bg: { _light: 'emerald.400', _dark: 'emerald.500' },
  opacity: { _light: '0.45', _dark: '0.3' },
})
