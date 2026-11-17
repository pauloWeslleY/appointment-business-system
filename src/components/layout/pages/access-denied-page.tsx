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
import { ArrowRight, House, MessageSquare } from 'lucide-react'

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

interface AccessDeniedPageProps {
  onContactAdministrator?: () => void
}

const AccessDeniedPage = ({
  onContactAdministrator,
}: AccessDeniedPageProps) => {
  const { homeRoute, navigateToPreviousPage } = usePagesValidateSession()

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
            403
          </Text>
          <Heading as="h1" css={pageTitleCss}>
            Acesso negado
          </Heading>
          <Text css={pageDescriptionCss}>
            Você não tem permissão para realizar essa ação. Entre em contato com
            o administrador da sua organização.
          </Text>
        </Stack>

        <Stack gap="3" align="flex-start">
          {onContactAdministrator ? (
            <Button
              size="sm"
              css={pagePrimaryActionCss}
              onClick={onContactAdministrator}
            >
              <Icon as={MessageSquare} />
              Falar com o administrador
            </Button>
          ) : (
            <Button asChild size="sm" css={pagePrimaryActionCss}>
              <Link to={homeRoute}>
                <Icon as={House} />
                Voltar para o início
              </Link>
            </Button>
          )}

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
        src="/illustrations/status/access-denied.svg"
        alt="Access denied illustration"
        css={pageIllustrationCss}
      />
    </Flex>
  )
}

export default AccessDeniedPage
