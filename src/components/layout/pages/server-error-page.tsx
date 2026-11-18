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
import { House, RotateCw } from 'lucide-react'

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

interface ServerErrorPageProps {
  onRetry: () => void
}

const ServerErrorPage = ({ onRetry }: ServerErrorPageProps) => {
  const { homeRoute } = usePagesValidateSession()

  return (
    <Flex
      as="section"
      direction={{ base: 'column-reverse', md: 'row' }}
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
            500
          </Text>
          <Heading as="h1" css={pageTitleCss}>
            Ops! Algo deu errado
          </Heading>
          <Text css={pageDescriptionCss}>
            Ocorreu um erro inesperado em nossos servidores. Tente novamente em
            alguns minutos.
          </Text>
        </Stack>

        <Stack gap="3" align="flex-start">
          <Button size="sm" css={pagePrimaryActionCss} onClick={onRetry}>
            <Icon as={RotateCw} />
            Tentar novamente
          </Button>

          <Button
            asChild
            variant="plain"
            size="sm"
            css={pageSecondaryActionCss}
          >
            <Link to={homeRoute}>
              <Icon as={House} />
              Voltar para o início
            </Link>
          </Button>
        </Stack>
      </Stack>

      <Image
        src="/illustrations/status/server-error.svg"
        alt="Server error illustration"
        css={pageIllustrationCss}
      />
    </Flex>
  )
}

export default ServerErrorPage
