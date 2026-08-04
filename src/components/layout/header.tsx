import {
  chakra,
  defineRecipe,
  Flex,
  type FlexProps,
  Icon,
  IconButton,
  type IconButtonProps,
} from '@chakra-ui/react'
import { useRouter } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import type { ElementType } from 'react'

const baseHeaderTitleRecipe = defineRecipe({
  className: 'base-header-title',
  base: {
    fontSize: '2xl',
    fontWeight: 'light',
    fontFamily: 'heading',
    color: { base: 'colorPalette.600', _dark: 'colorPalette.200' },
  },
})

const baseHeaderSubTitleRecipe = defineRecipe({
  className: 'base-header-sub-title',
  base: {
    fontSize: 'md',
    fontWeight: 'medium',
    letterSpacing: 'wider',
    color: { base: 'gray.400', _dark: 'gray.500' },
  },
})

const HeaderIcon = (props: { icon: ElementType }) => {
  return (
    <Flex
      align="center"
      justify="center"
      boxSize="8"
      rounded="full"
      bg={{ base: 'primary.200/60', _dark: 'primary.700/80' }}
    >
      <Icon
        as={props.icon}
        boxSize="5"
        color={{ base: 'primary.400', _dark: 'primary.200' }}
      />
    </Flex>
  )
}

const HeaderRoot = (props: FlexProps) => {
  return <Flex {...props} align="center" gap="2" w="full" />
}

const HeaderButton = (props: IconButtonProps) => {
  const router = useRouter()

  return (
    <IconButton
      {...props}
      size="2xs"
      rounded="full"
      variant="ghost"
      aria-label="Voltar"
      onClick={() => router.history.back()}
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
