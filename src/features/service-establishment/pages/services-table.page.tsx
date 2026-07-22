import {
  Alert,
  Box,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Image,
  Pagination,
  type PaginationPageChangeDetails,
  Skeleton,
  Spinner,
  Stack,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useParams } from '@tanstack/react-router'
import { useSearch } from '@tanstack/react-router'
import { FileImage } from 'lucide-react'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

import { useGetServiceByEstablishment } from '@/features/service-establishment/hooks/use-get-service-by-establishment'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import MenuActionServicesTable from '../components/menu-action-services-table'

const ServicesTablePage = () => {
  const [isPendingPagination, startTransition] = useTransition()
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/services/',
  })
  const search = useSearch({
    from: '/dashboard/$establishmentId/services/',
  })

  const {
    data: servicesEsblishment = [],
    isLoading: isLoadingServicesEstablishment,
    error: errorServicesEstablishment,
  } = useGetServiceByEstablishment(establishmentId)

  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(10),
    },
    {
      shallow: true,
    },
  )

  const visibleServices = useMemo(() => {
    const query = search.q?.toLowerCase()
    const loadTableServicesEsblishment = servicesEsblishment.filter(
      (service) => {
        const queryStringName = query
          ? service.name.toLowerCase().includes(query)
          : true

        const queryStringDescription = query
          ? service.description.toLowerCase().includes(query)
          : true

        return queryStringName || queryStringDescription
      },
    )

    const start = (pagination.page - 1) * pagination.page_size
    const end = start + pagination.page_size

    return loadTableServicesEsblishment.slice(start, end)
  }, [search.q, servicesEsblishment, pagination.page, pagination.page_size])

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  if (isLoadingServicesEstablishment) {
    return (
      <Stack gap="2" w="full" p="2">
        <Skeleton height="70px" rounded="xl" />
        <Skeleton height="70px" rounded="xl" />
        <Skeleton height="70px" rounded="xl" />
      </Stack>
    )
  }

  if (errorServicesEstablishment) {
    return (
      <Alert.Root status="error" rounded="xl">
        <Alert.Indicator />
        <Alert.Title>{errorServicesEstablishment.message}</Alert.Title>
      </Alert.Root>
    )
  }

  if (servicesEsblishment.length === 0) {
    return (
      <Alert.Root status="info" rounded="xl">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Não há serviços disponíveis</Alert.Title>
          <Alert.Description>
            Nenhum serviço foi encontrado para este estabelecimento.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  return (
    <Stack gap="4" w="full">
      {isPendingPagination && (
        <VStack colorPalette={colorDefaultTheme}>
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Carregando dados...</Text>
        </VStack>
      )}

      {!isPendingPagination && (
        <Table.Root size="sm" rounded="xl" overflow="hidden">
          <Table.Header>
            <Table.Row
              bg={{ base: 'colorPalette.200', _dark: 'colorPalette.900/40' }}
            >
              <Table.ColumnHeader py="3">Imagem</Table.ColumnHeader>
              <Table.ColumnHeader py="3">Nome</Table.ColumnHeader>
              <Table.ColumnHeader py="3">Descrição</Table.ColumnHeader>
              <Table.ColumnHeader py="3">Preço</Table.ColumnHeader>
              <Table.ColumnHeader py="3" textAlign="end">
                Ações
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {visibleServices.map((item) => (
              <Table.Row
                key={item.id}
                transition="colors"
                bg={{ base: 'white', _dark: 'gray.950/40' }}
                _hover={{
                  bg: { base: 'gray.100', _dark: 'colorPalette.900/30' },
                }}
              >
                <Table.Cell>
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      boxSize="50px"
                      objectFit="cover"
                      rounded="lg"
                    />
                  )}

                  {!item.imageUrl && (
                    <Box
                      p="2"
                      bg={{ base: 'gray.200', _dark: 'gray.800' }}
                      rounded="full"
                      w="fit-content"
                    >
                      <Icon boxSize="6">
                        <FileImage />
                      </Icon>
                    </Box>
                  )}
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>
                  {formatCurrencyInCents(item.servicePriceInCents)}
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <MenuActionServicesTable service={item} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}

      {servicesEsblishment.length > pagination.page_size && (
        <HStack justify="space-between" w="full">
          <Pagination.Root
            count={servicesEsblishment.length}
            pageSize={pagination.page_size}
            page={pagination.page}
            onPageChange={handlePageChange}
          >
            <ButtonGroup alignSelf="end" size="sm" variant="subtle">
              <Pagination.PrevTrigger asChild>
                <IconButton aria-label="Página anterior" rounded="xl">
                  <LuChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(item) => (
                  <IconButton
                    aria-label={`Página ${item.value}`}
                    variant={{ base: 'ghost', _selected: 'outline' }}
                    rounded="xl"
                  >
                    {item.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton aria-label="Próxima página" rounded="xl">
                  <LuChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>

          <Box>
            <Text fontSize="sm" color="gray.400">
              {`Exibindo ${visibleServices.length} de ${servicesEsblishment.length} serviços`}
            </Text>
          </Box>
        </HStack>
      )}
    </Stack>
  )
}

export default ServicesTablePage
