import {
  Alert,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  InputGroup,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { PlusIcon, SearchIcon } from 'lucide-react'

import InputField from '@/components/input-field'

import CardEstablishment from '../components/card-establishment'
import NotFoundEstablishment from '../components/not-found-establishment'
import { useGetEstablishmentsByOwner } from '../hooks/use-get-esblishment-by-owner'

const ListEstablishmentPage = () => {
  const navigate = useNavigate()
  const { establishments, errorEstablishments, isLoadingEstablishments } =
    useGetEstablishmentsByOwner()

  if (isLoadingEstablishments) {
    return (
      <Stack gap="4" w="full" p="2">
        <HStack width="full">
          <SkeletonCircle size="10" />
          <SkeletonText noOfLines={2} />
        </HStack>
        <Skeleton height="100px" rounded="xl" />
        <Skeleton height="100px" rounded="xl" />
        <Skeleton height="100px" rounded="xl" />
      </Stack>
    )
  }

  if (errorEstablishments) {
    return <NotFoundEstablishment message={errorEstablishments.message} />
  }

  return (
    <VStack gap={{ base: '4', lg: '8' }}>
      <Flex w="full" justify="space-between" align="center">
        <Box w="fit-content">
          <InputGroup startElement={<Icon as={SearchIcon} boxSize="5" />}>
            <InputField placeholder="Buscar..." />
          </InputGroup>
        </Box>

        <Button
          rounded="xl"
          size="sm"
          onClick={() => navigate({ to: '/establishment/new' })}
        >
          <Icon as={PlusIcon} boxSize="5" />
          Novo estabelecimento
        </Button>
      </Flex>

      {establishments.length === 0 && (
        <Alert.Root status="warning" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>Nenhum estabelecimento encontrado</Alert.Title>
        </Alert.Root>
      )}

      {establishments.length >= 1 && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4" w="full">
          {establishments.map((establishment) => (
            <CardEstablishment
              key={establishment.id}
              establishment={establishment}
            />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  )
}

export default ListEstablishmentPage
