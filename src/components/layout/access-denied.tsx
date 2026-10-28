import { Alert, Flex, Icon } from '@chakra-ui/react'
import { X } from 'lucide-react'

const AccessDenied = () => {
  return (
    <Alert.Root
      status="error"
      variant="surface"
      rounded="lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="xl"
      mx="auto"
    >
      <Flex
        align="center"
        justify="center"
        boxSize="16"
        bg="red.500"
        rounded="full"
        mb="4"
      >
        <Icon as={X} boxSize="10" />
      </Flex>

      <Alert.Content textAlign="center" spaceY="2">
        <Alert.Title
          fontSize="2xl"
          color={{ _light: 'blackAlpha.950', _dark: 'whiteAlpha.950' }}
        >
          Acesso Negado.
        </Alert.Title>
        <Alert.Description>
          Você não tem permissão para acessar esta página.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}

export default AccessDenied
