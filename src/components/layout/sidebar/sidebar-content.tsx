import { chakra, defineRecipe } from '@chakra-ui/react'

const baseSidebarContentRecipe = defineRecipe({
  className: 'sidebar-content',
  base: {
    flex: '1',
    transition: '.3s ease',
    bgGradient: 'to-tr',
    gradientFrom: {
      base: 'gray.100/70',
      _dark: 'gray.900/80',
    },
    gradientTo: {
      base: 'gray.50',
      _dark: 'gray.800/50',
    },
  },
})

const SidebarContent = chakra('section', baseSidebarContentRecipe)

export default SidebarContent
