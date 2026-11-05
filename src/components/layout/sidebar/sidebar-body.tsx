import { chakra, defineRecipe } from '@chakra-ui/react'

const baseSidebarBodyRecipe = defineRecipe({
  className: 'sidebar-body',
  base: {
    p: { base: '2', md: '4' },
    minW: '0',
  },
})

const SidebarBody = chakra('main', baseSidebarBodyRecipe)

export default SidebarBody
