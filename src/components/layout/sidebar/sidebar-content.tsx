import { chakra, defineRecipe } from '@chakra-ui/react'

const baseSidebarContentRecipe = defineRecipe({
  className: 'sidebar-content',
  base: {
    flex: '1',
    overflowY: 'auto',
    transition: '.3s ease',
    shadow: { base: 'lg', _dark: 'md' },
    zIndex: '1',
    bgGradient: 'to-tl',
    gradientFrom: {
      base: 'secondary.200/70',
      _dark: 'colorPalette.900/90',
    },
    gradientTo: {
      base: 'colorPalette.100',
      _dark: 'secondary.700',
    },
  },
})

const SidebarContent = chakra('section', baseSidebarContentRecipe)

export default SidebarContent
