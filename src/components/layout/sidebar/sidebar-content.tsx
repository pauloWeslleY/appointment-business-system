import { chakra, defineRecipe } from '@chakra-ui/react'

const baseSidebarContentRecipe = defineRecipe({
  className: 'sidebar-content',
  base: {
    // Torna o painel rolável o bloco de contenção dos elementos absolutos
    // (ex.: selects ocultos do Chakra), para que não estendam a altura do
    // documento e façam a página inteira rolar.
    position: 'relative',
    flex: '1',
    minW: '0',
    h: 'dvh',
    overflowY: 'auto',
    transition: '.3s ease',
    shadow: { _light: 'lg', _dark: 'md' },
    zIndex: '1',
    bg: 'sidebar.content.bg',
  },
})

const SidebarContent = chakra('section', baseSidebarContentRecipe)

export default SidebarContent
