import { Alert, Box, Button, HStack, Icon } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

import Header from '@/components/layout/header'

interface NotFoundEstablishmentProps {
  message?: string
}

const NotFoundEstablishment = ({ message }: NotFoundEstablishmentProps) => {
  return (
    <Box spaceY={{ base: '4', lg: '8' }}>
      <Header.Root justify="space-between">
        <HStack align="center">
          <Header.Button />
          <Header.Title lineHeight={0}>Estabelecimentos</Header.Title>
        </HStack>

        <Button asChild rounded="xl" size="sm">
          <Link to="/establishment/new">
            <Icon as={PlusIcon} boxSize="5" />
            Cadastrar estabelecimento
          </Link>
        </Button>
      </Header.Root>

      <Alert.Root status="warning" rounded="xl">
        <Alert.Indicator />
        <Alert.Title>
          {message || 'Erro ao buscar estabelecimentos'}
        </Alert.Title>
      </Alert.Root>
    </Box>
  )
}

export default NotFoundEstablishment
