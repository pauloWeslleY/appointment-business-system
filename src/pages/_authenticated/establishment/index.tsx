import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  For,
  HStack,
  Icon,
  Input,
  InputGroup,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import {
  ExternalLinkIcon,
  PencilLineIcon,
  PlusIcon,
  SearchIcon,
  Store,
} from 'lucide-react'

import Header from '@/components/layout/header'
import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/shared/auth'
import { establishmentQueryKeys } from '@/shared/constants/establishment.query-key'
import useGetOwnerById from '@/shared/hooks/use-get-owner-by-id'
import { getEstablishmentsByOwnerIdService } from '@/shared/services/establishment/establishment.service'
import { getOwnerByUserIdService } from '@/shared/services/owner/owner.service'
import { FormatMask, formatterMask } from '@/utils/formatted-mask'

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

  const formatPhone = (phone: string) => {
    return formatterMask(phone, FormatMask.CELLPHONE)
  }

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
              <Input
                placeholder="Buscar..."
                size="sm"
                rounded="xl"
                borderColor={{ base: 'gray.300', _dark: 'gray.700' }}
              />
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
            {establishments.map((establishment, index) => (
              <Card.Root
                key={index}
                variant="outline"
                rounded="xl"
                display="flex"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                bg={{ base: 'white', _dark: 'gray.950/40' }}
              >
                <Card.Header
                  w="full"
                  display="flex"
                  flexDir="row"
                  alignItems="center"
                >
                  <Flex
                    gap="2"
                    align="center"
                    justify="center"
                    bg={{ base: 'colorPalette.300', _dark: 'colorPalette.700' }}
                    p="2"
                    rounded="full"
                    w="fit-content"
                  >
                    <Icon as={Store} boxSize="6" />
                  </Flex>

                  <Text fontWeight="light">{establishment.name}</Text>
                </Card.Header>
                <Card.Body
                  w="full"
                  borderBottomWidth="1px"
                  borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
                >
                  <For
                    each={[
                      {
                        label: 'Descrição',
                        value: establishment.description,
                      },
                      {
                        label: 'Telefone',
                        value: establishment.phones
                          .map(formatPhone)
                          .join(' - '),
                      },
                    ]}
                  >
                    {(item) => (
                      <HStack w="full" gap="1">
                        <Text fontWeight="light">{item.label}:</Text>
                        <Text
                          fontWeight="semibold"
                          color={{ base: 'gray.400', _dark: 'gray.500' }}
                        >
                          {item.value}
                        </Text>
                      </HStack>
                    )}
                  </For>
                </Card.Body>
                <Card.Footer p="2" w="full">
                  <Button
                    variant="ghost"
                    rounded="xl"
                    size="sm"
                    flex="1"
                    onClick={() =>
                      navigate({
                        to: '/establishment/$establishmentId',
                        params: { establishmentId: establishment.id },
                      })
                    }
                  >
                    <Icon as={PencilLineIcon} boxSize="4" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    rounded="xl"
                    size="sm"
                    flex="1"
                    onClick={() =>
                      navigate({
                        to: '/dashboard/$establishmentId/overview',
                        params: { establishmentId: establishment.id },
                      })
                    }
                  >
                    <Icon as={ExternalLinkIcon} boxSize="4" />
                    Ir para estabelecimento
                  </Button>
                </Card.Footer>
              </Card.Root>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  )
}
