import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { type ErrorComponentProps, Navigate } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { AccessDeniedError } from '@/shared/errors'

const ResponseErrorMessage = ({ response }: { response: Response }) => {
  const [result, setResult] = useState<{
    response: Response
    message: string
  } | null>(null)

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
    return <Navigate to="/access-denied" replace />
  }

  return (
    <Container maxW="container.lg" centerContent>
      <VStack
        justify="center"
        shadow="xs"
        p="8"
        w="full"
        rounded="lg"
        bg={{ _light: 'primary.200', _dark: 'primary.500/20' }}
        borderWidth="1px"
        borderColor="border.secondary"
        gap="1"
        mt={{ base: '10', xl: '32' }}
      >
        <Flex
          align="center"
          justify="center"
          h="100px"
          w="100px"
          bg="red.500"
          rounded="full"
          mb="4"
        >
          <Icon as={X} boxSize="20" />
        </Flex>

        <Box spaceY="2" mb="4" textAlign="center">
          <Heading size="3xl">Ops! Algo deu errado.</Heading>
          <Text as="span" fontSize="lg" color="fg.error">
            {props.error instanceof Response ? (
              <ResponseErrorMessage response={props.error} />
            ) : (
              validateErrorMessage(props.error)
            )}
          </Text>
        </Box>

        <Flex gap="4">
          <Button
            variant="surface"
            rounded="xl"
            size="sm"
            onClick={handleResetAndReloadPage}
          >
            Tentar novamente
          </Button>
          <Button
            variant="surface"
            rounded="xl"
            size="sm"
            colorPalette="primary"
            onClick={handleNavigateToPreviousPage}
          >
            Voltar para a página anterior
          </Button>
        </Flex>
      </VStack>
    </Container>
  )
}

export default AppError
