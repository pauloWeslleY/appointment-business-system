import { chakra, defineRecipe } from '@chakra-ui/react'

const baseSidebarNavTitleRecipe = defineRecipe({
  className: 'sidebar-nav-title',
  base: {
    fontSize: 'sm',
    fontWeight: 'medium',
    letterSpacing: 'wider',
    color: { _light: 'gray.600', _dark: 'gray.400' },
    my: '4',
    pl: '2',
  },
  variants: {
    collapsed: {
      open: {
        display: 'block',
      },
      closed: {
        display: 'none',
      },
    },
  },

  defaultVariants: {
    collapsed: 'open',
  },
})

const SideBarNavTitle = chakra('span', baseSidebarNavTitleRecipe)

export default SideBarNavTitle
