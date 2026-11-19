import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
import { type ErrorComponentProps } from '@tanstack/react-router'
import { ArrowLeftIcon, RotateCwIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { AccessDeniedError } from '@/shared/errors'

import Logotipo from '../logotipo'
import AccessDeniedPage from './pages/access-denied-page'
import BackgroundShapes from './pages/background-shapes'
import {
  pageCardCss,
  pageCodeCss,
  pageDescriptionCss,
  pageIllustrationCss,
  pagePrimaryActionCss,
  pageSecondaryActionCss,
  pageTitleCss,
} from './pages/define-styles'
import { PageStatusContainer } from './pages/page-status-container'

interface ResultProps {
  response: Response
  message: string
}

const ResponseErrorMessage = ({ response }: { response: Response }) => {
  const [result, setResult] = useState<ResultProps | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchMessage() {
      try {
        const text = await response.clone().text()

        if (isMounted) {
          setResult({ response, message: text })
        }
      } catch {
        if (isMounted) {
          setResult({ response, message: 'Erro ao processar a resposta.' })
        }
      }
    }

    void fetchMessage()

    return () => {
      isMounted = false
    }
  }, [response])

  const message =
    result?.response === response ? result.message : 'Carregando mensagem...'

  return (
    <>
      {response.status} — {message || 'Ops! Algo deu errado.'}
    </>
  )
}

const validateErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Ocorreu um erro desconhecido.'
}

const AppError = (props: ErrorComponentProps) => {
  const handleResetAndReloadPage = () => {
    window.location.reload()
    props.reset()
  }

  const handleNavigateToPreviousPage = () => {
    window.history.back()
  }

  if (props.error instanceof AccessDeniedError) {
    return (
      <PageStatusContainer>
        <AccessDeniedPage />
      </PageStatusContainer>
    )
  }

  return (
    <Portal>
      <Box
        pos="fixed"
        inset="0"
        zIndex="overlay"
        display="flex"
        flexDir="column"
        overflowY="auto"
        overscrollBehavior="contain"
        _motionSafe={{
          animationName: 'fade-in',
          animationDuration: 'moderate',
        }}
      >
        <Box
          pos="fixed"
          inset="0"
          aria-hidden="true"
          backdropFilter="blur(16px) saturate(160%)"
          bg="black/50"
        />

        <Container
          pos="relative"
          maxW="breakpoint-lg"
          centerContent
          my="auto"
          flexShrink="0"
          py="6"
        >
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
                <Text
                  color="red.500"
                  overflowWrap="anywhere"
                  css={pageDescriptionCss}
                >
                  {props.error instanceof Response ? (
                    <ResponseErrorMessage response={props.error} />
                  ) : (
                    validateErrorMessage(props.error)
                  )}
                </Text>
              </Stack>

              <Stack gap="3" align="flex-start">
                <Button
                  size="sm"
                  css={pagePrimaryActionCss}
                  onClick={handleResetAndReloadPage}
                >
                  <Icon as={RotateCwIcon} />
                  Tentar novamente
                </Button>

                <Button
                  variant="plain"
                  size="sm"
                  whiteSpace="normal"
                  css={pageSecondaryActionCss}
                  onClick={handleNavigateToPreviousPage}
                >
                  <Icon as={ArrowLeftIcon} />
                  Voltar para a página anterior
                </Button>
              </Stack>
            </Stack>

            <Image
              src="/illustrations/status/server-error.svg"
              alt="Server error illustration"
              css={pageIllustrationCss}
            />
          </Flex>
        </Container>
      </Box>
    </Portal>
  )
}

export default AppError
