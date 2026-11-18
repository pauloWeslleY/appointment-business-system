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
import { LogIn } from 'lucide-react'

import Logotipo from '@/components/logotipo'

import BackgroundShapes from './background-shapes'
import {
  pageCardCss,
  pageCodeCss,
  pageDescriptionCss,
  pageIllustrationCss,
  pagePrimaryActionCss,
  pageTitleCss,
} from './define-styles'
import { usePagesValidateSession } from './use-pages-validate-session'

const UnauthorizedPage = () => {
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
            401
          </Text>
          <Heading as="h1" css={pageTitleCss}>
            Acesso não autorizado
          </Heading>
          <Text css={pageDescriptionCss}>
            Você não tem permissão para acessar esta página. Verifique se você
            está na conta correta ou entre em contato com o administrador.
          </Text>
        </Stack>

        <Stack gap="3" align="flex-start">
          <Button asChild size="sm" css={pagePrimaryActionCss}>
            <Link to={homeRoute}>
              <Icon as={LogIn} />
              Voltar para o início
            </Link>
          </Button>
        </Stack>
      </Stack>

      <Image
        src="/illustrations/status/unauthorized.svg"
        alt="Unauthorized access illustration"
        css={pageIllustrationCss}
      />
    </Flex>
  )
}

export default UnauthorizedPage
