import { chakra, defineRecipe } from '@chakra-ui/react'

const baseSidebarContentRecipe = defineRecipe({
  className: 'sidebar-content',
  base: {
    flex: '1',
    overflowY: 'auto',
    transition: '.3s ease',
    shadow: { base: 'lg', _dark: 'md' },
    zIndex: '1',
    bg: 'sidebar.content.bg',
  },
})

const SidebarContent = chakra('section', baseSidebarContentRecipe)

export default SidebarContent
