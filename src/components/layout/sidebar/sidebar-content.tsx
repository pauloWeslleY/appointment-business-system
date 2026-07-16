import { chakra, defineRecipe } from '@chakra-ui/react'

const baseSidebarContentRecipe = defineRecipe({
  className: 'sidebar-content',
  base: {
    flex: '1',
    transition: '.3s ease',
    bgGradient: 'to-tr',
    gradientFrom: {
      base: 'secondary.200/70',
      _dark: 'secondary.900',
    },
    gradientTo: {
      base: 'colorPalette.100',
      _dark: 'colorPalette.900/90',
    },
  },
})

const SidebarContent = chakra('section', baseSidebarContentRecipe)

export default SidebarContent
