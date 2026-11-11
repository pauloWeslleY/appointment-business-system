import { chakra, defineRecipe } from '@chakra-ui/react'

const baseMenuNavLinkRoot = defineRecipe({
  className: 'menu-nav-link-root',
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '2',
    p: '2',
    rounded: 'xl',
    shadow: 'xs',
    border: '1px solid',
    bg: { _light: 'white', _dark: 'slate.900/60' },
    borderColor: { _light: 'gray.200', _dark: 'slate.800/80' },
    w: 'fit',
  },
})

const baseMenuNavLinkRecipe = defineRecipe({
  className: 'menu-nav-link',
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: '2',
    px: '2',
    minH: '10',
    transition: 'backgrounds',
    rounded: 'lg',
  },
  variants: {
    active: {
      true: {
        shadow: 'none',
        rounded: 'lg',
        bg: { _light: 'navy.100', _dark: 'navy.900/60' },
        outlineOffset: '2px',
        outline: '2px solid',
        outlineColor: { _light: 'navy.300', _dark: 'navy.700' },
        fontWeight: 'medium',
        letterSpacing: 'wider',
        color: {
          _light: 'sea.900',
          _dark: 'sea.500',
        },
        _hover: {
          bg: {
            _light: 'slate.200',
            _dark: 'navy.800/60',
          },
        },
      },
      false: {
        bg: 'transparent',
        color: {
          _light: 'gray.900',
          _dark: 'gray.400',
        },
        _hover: {
          bg: {
            _light: 'blackAlpha.200',
            _dark: 'blackAlpha.500',
          },
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
})

export const MenuNavigation = {
  Root: chakra('div', baseMenuNavLinkRoot),
  Link: chakra('button', baseMenuNavLinkRecipe),
}
