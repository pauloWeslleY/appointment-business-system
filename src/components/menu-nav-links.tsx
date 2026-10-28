import { chakra, defineRecipe } from '@chakra-ui/react'

const baseMenuNavLinkRoot = defineRecipe({
  className: 'menu-nav-link-root',
  base: {
    display: 'flex',
    alignItems: 'center',
    rounded: 'xl',
    shadow: 'xs',
    p: '1',
    bg: { _light: 'white', _dark: 'gray.950/40' },
    border: '1px solid',
    borderColor: { _light: 'gray.200', _dark: 'secondary.500/20' },
  },
})

const baseMenuNavLinkRecipe = defineRecipe({
  className: 'menu-nav-link',
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: '1',
    transition: 'backgrounds',
    rounded: 'xl',
    flex: '1',
  },
  variants: {
    active: {
      true: {
        shadow: 'sm',
        border: '1px solid',
        borderColor: {
          _light: 'slate.200',
          _dark: 'slate.900',
        },
        fontWeight: 'medium',
        letterSpacing: 'wider',
        color: {
          _light: 'sea.900',
          _dark: 'sea.500',
        },
        bg: {
          _light: 'slate.100',
          _dark: 'slate.950',
        },
        _hover: {
          bg: {
            _light: 'slate.200',
            _dark: 'slate.700/60',
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
