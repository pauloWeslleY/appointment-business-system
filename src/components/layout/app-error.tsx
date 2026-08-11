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
import { useRouter } from '@tanstack/react-router'
import { X } from 'lucide-react'

const AppError = (props: { error: Error; reset: () => void }) => {
  const router = useRouter()

  const handleResetAndReloadPage = () => {
    window.location.reload()
    props.reset()
  }

  const handleNavigateToPreviousPage = () => {
    router.history.back()
  }

  return (
    <Container maxW="container.lg" centerContent py="8">
      <VStack
        justify="center"
        shadow="xs"
        p="8"
        w="full"
        h="full"
        rounded="lg"
        bg={{ base: 'primary.200s', _dark: 'primary.500/20' }}
        borderWidth="1px"
        borderColor="border.secondary"
        gap="1"
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
            {props.error.message}
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
