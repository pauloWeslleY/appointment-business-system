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
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { PlusIcon, SearchIcon } from 'lucide-react'

import InputField from '@/components/input-field'
import Header from '@/components/layout/header'
import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/shared/auth'
import { establishmentQueryKeys } from '@/shared/constants/establishment.query-key'
import useGetOwnerById from '@/shared/hooks/use-get-owner-by-id'
import { getEstablishmentsByOwnerIdService } from '@/shared/services/establishment/establishment.service'
import { getOwnerByUserIdService } from '@/shared/services/owner/owner.service'

import CardEstablishment from './-components/card-establishment'
import NotFoundEstablishment from './-components/not-found-establishment'

export const Route = createFileRoute('/_authenticated/establishment/')({
  beforeLoad: async () => {
    const { data } = await authClient.getSession()
    if (!data) throw redirect({ to: '/login' })

    try {
      await getOwnerByUserIdService(data.user.id)
    } catch (err) {
      toaster.error({
        title: (err as Error).message || 'Erro ao buscar proprietário',
      })
      throw redirect({ to: '/owner/new' })
    }
  },
  component: EstablishmentPage,
})

function EstablishmentPage() {
  const { data: owner } = useGetOwnerById()
  const navigate = Route.useNavigate()

  const {
    data: establishments = [],
    error: errorEstablishments,
    isLoading: isLoadingEstablishments,
  } = useQuery({
    queryKey: establishmentQueryKeys.owner(owner?.id),
    queryFn: () => getEstablishmentsByOwnerIdService(owner?.id),
    enabled: !!owner?.id,
  })

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
    <Box spaceY={{ base: '4', lg: '8' }}>
      <Header.Root>
        <HStack align="center">
          <Header.Button />
          <Header.Title lineHeight={0}>Estabelecimentos</Header.Title>
        </HStack>
      </Header.Root>

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
    </Box>
  )
}
