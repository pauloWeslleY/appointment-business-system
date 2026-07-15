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
import { ArrowBigLeftDash } from 'lucide-react'

const baseHeaderTitleRecipe = defineRecipe({
  className: 'base-header-title',
  base: {
    fontSize: '2xl',
    fontWeight: 'light',
    fontFamily: 'heading',
  },
})

const baseHeaderSubTitleRecipe = defineRecipe({
  className: 'base-header-sub-title',
  base: {
    fontSize: 'md',
    fontWeight: 'medium',
    color: 'gray.500',
  },
})

const HeaderTitle = chakra('h2', baseHeaderTitleRecipe)
const HeaderSubTitle = chakra('p', baseHeaderSubTitleRecipe)

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
      <Icon as={ArrowBigLeftDash} boxSize="4" />
    </IconButton>
  )
}

const Header = {
  Title: HeaderTitle,
  SubTitle: HeaderSubTitle,
  Button: HeaderButton,
  Root: HeaderRoot,
}

export default Header
