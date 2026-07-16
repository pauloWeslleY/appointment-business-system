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
      value: { _light: '{colors.secondary.800}', _dark: '{colors.secondary.200}' },
    },
    subtle: {
      value: { _light: '{colors.secondary.100}', _dark: '{colors.secondary.900}' },
    },
    muted: {
      value: { _light: '{colors.secondary.200}', _dark: '{colors.secondary.800}' },
    },
    emphasized: {
      value: { _light: '{colors.secondary.300}', _dark: '{colors.secondary.700}' },
    },
    solid: {
      value: { _light: '{colors.secondary.900}', _dark: '{colors.secondary.300}' },
    },
    focusRing: {
      value: { _light: '{colors.secondary.400}', _dark: '{colors.secondary.400}' },
    },
    border: {
      value: { _light: '{colors.secondary.200}', _dark: '{colors.secondary.800}' },
    },
  },
  tertiary: {
    contrast: {
      value: { _light: '{colors.tertiary.900}', _dark: '{colors.tertiary.900}' },
    },
    fg: {
      value: { _light: '{colors.tertiary.800}', _dark: '{colors.tertiary.200}' },
    },
    subtle: {
      value: { _light: '{colors.tertiary.100}', _dark: '{colors.tertiary.900}' },
    },
    muted: {
      value: { _light: '{colors.tertiary.200}', _dark: '{colors.tertiary.800}' },
    },
    emphasized: {
      value: { _light: '{colors.tertiary.300}', _dark: '{colors.tertiary.700}' },
    },
    solid: {
      value: { _light: '{colors.tertiary.500}', _dark: '{colors.tertiary.300}' },
    },
    focusRing: {
      value: { _light: '{colors.tertiary.400}', _dark: '{colors.tertiary.400}' },
    },
    border: {
      value: { _light: '{colors.tertiary.200}', _dark: '{colors.tertiary.800}' },
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
})
