import {
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, House } from 'lucide-react'

import Logotipo from '@/components/logotipo'

import BackgroundShapes from './background-shapes'
import {
  pageCardCss,
  pageCodeCss,
  pageDescriptionCss,
  pageIllustrationCss,
  pagePrimaryActionCss,
  pageSecondaryActionCss,
  pageTitleCss,
} from './define-styles'
import { usePagesValidateSession } from './use-pages-validate-session'

const NotFoundPage = () => {
  const { homeRoute, navigateToPreviousPage } = usePagesValidateSession()

  return (
    <Flex
      as="section"
      flexDir={{ base: 'column-reverse', md: 'row' }}
      align="center"
      justify="space-between"
      gap={{ base: '6', md: '10' }}
      css={pageCardCss}
    >
      <BackgroundShapes />

      <Stack gap="6" align="flex-start" minW="0" zIndex="1">
        <Logotipo variant="horizontal" h="8" />

        <Stack gap="2">
          <Text as="span" css={pageCodeCss}>
            404
          </Text>
          <Heading as="h1" css={pageTitleCss}>
            Página não encontrada
          </Heading>
          <Text css={pageDescriptionCss}>
            A página que você está procurando não existe ou foi removida.
          </Text>
        </Stack>

        <Stack gap="3" align="flex-start">
          <Button asChild size="sm" css={pagePrimaryActionCss}>
            <Link to={homeRoute}>
              <Icon as={House} />
              Voltar para o início
            </Link>
          </Button>

          <Button
            variant="plain"
            size="sm"
            css={pageSecondaryActionCss}
            onClick={navigateToPreviousPage}
          >
            <Icon as={ArrowRight} />
            Voltar para a página anterior
          </Button>
        </Stack>
      </Stack>

      <Image
        src="/illustrations/status/not-found.svg"
        alt="Not found illustration"
        css={pageIllustrationCss}
      />
    </Flex>
  )
}

export default NotFoundPage
