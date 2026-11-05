import {
  chakra,
  defineRecipe,
  Flex,
  type FlexProps,
  Icon,
  IconButton,
  type IconButtonProps,
} from '@chakra-ui/react'
import { ArrowLeft } from 'lucide-react'
import type { ElementType } from 'react'

const baseHeaderTitleRecipe = defineRecipe({
  className: 'base-header-title',
  base: {
    fontSize: { base: 'xl', md: '2xl' },
    overflowWrap: 'anywhere',
    fontWeight: 'light',
    fontFamily: 'heading',
    color: { _light: 'colorPalette.600', _dark: 'colorPalette.200' },
  },
})

const baseHeaderSubTitleRecipe = defineRecipe({
  className: 'base-header-sub-title',
  base: {
    fontSize: 'md',
    fontWeight: 'medium',
    letterSpacing: 'wider',
    color: { _light: 'gray.400', _dark: 'gray.500' },
  },
})

const HeaderIcon = (props: { icon: ElementType }) => {
  return (
    <Flex
      align="center"
      justify="center"
      boxSize="8"
      flexShrink="0"
      rounded="lg"
      bg={{ _light: 'primary.200/60', _dark: 'primary.500/80' }}
    >
      <Icon
        as={props.icon}
        boxSize="5"
        color={{ _light: 'primary.400', _dark: 'primary.200' }}
      />
    </Flex>
  )
}

const HeaderRoot = (props: FlexProps) => {
  return (
    <Flex align="center" gap="2" w="full" minW="0" flexWrap="wrap" {...props} />
  )
}

const HeaderButton = (props: IconButtonProps) => {
  const handleNavigateToPreviousPage = () => {
    window.history.back()
  }

  return (
    <IconButton
      {...props}
      size="sm"
      rounded="full"
      variant="ghost"
      aria-label="Voltar"
      onClick={handleNavigateToPreviousPage}
    >
      <Icon as={ArrowLeft} boxSize="4" />
    </IconButton>
  )
}

const Header = {
  Title: chakra('h2', baseHeaderTitleRecipe),
  SubTitle: chakra('p', baseHeaderSubTitleRecipe),
  Icon: HeaderIcon,
  Button: HeaderButton,
  Root: HeaderRoot,
}

export default Header
