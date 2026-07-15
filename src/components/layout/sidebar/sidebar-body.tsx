import { chakra, defineRecipe } from '@chakra-ui/react'

const baseSidebarBodyRecipe = defineRecipe({
  className: 'sidebar-body',
  base: {
    p: '4',
    h: 'full',
  },
})

const SidebarBody = chakra('main', baseSidebarBodyRecipe)

export default SidebarBody
