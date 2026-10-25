import { chakra, defineRecipe } from '@chakra-ui/react'

const baseSidebarRootRecipe = defineRecipe({
  className: 'sidebar-root',
  base: {
    display: 'flex',
    w: 'full',
    h: 'full',
    bg: { _light: 'gray.50', _dark: 'gray.700' },
    minH: 'dvh',
  },
})

const SidebarRoot = chakra('section', baseSidebarRootRecipe)

export default SidebarRoot
