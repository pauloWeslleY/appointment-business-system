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
  pageDescriptionCss,
  pageIllustrationCss,
  pagePrimaryActionCss,
  pageTitleCss,
} from './define-styles'

const SessionExpiredPage = () => {
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
          <Heading as="h1" css={pageTitleCss}>
            Sessão expirada
          </Heading>
          <Text css={pageDescriptionCss}>
            Sua sessão expirou por inatividade. Faça login novamente para
            continuar.
          </Text>
        </Stack>

        <Stack gap="3" align="flex-start">
          <Button asChild size="sm" css={pagePrimaryActionCss}>
            <Link to="/login">
              <Icon as={LogIn} />
              Fazer login
            </Link>
          </Button>
        </Stack>
      </Stack>

      <Image
        src="/illustrations/status/session-expired.svg"
        alt=""
        css={pageIllustrationCss}
      />
    </Flex>
  )
}

export default SessionExpiredPage
