import {
  Alert,
  Box,
  Flex,
  For,
  HStack,
  type PaginationPageChangeDetails,
  SimpleGrid,
  Skeleton,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useParams } from '@tanstack/react-router'
import { useSearch } from '@tanstack/react-router'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import SelectPageSize from '@/components/layout/select-page-size'
import { useGetServiceByEstablishment } from '@/features/service-establishment/hooks/use-get-service-by-establishment'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import CardServiceEsblishment from '../components/card-service-establishment'

const ServicesListPage = () => {
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
      page_size: parseAsInteger.withDefault(12).withOptions({
        clearOnDefault: false,
      }),
    },
    {
      shallow: false,
    },
  )

  const filteredServices = useMemo(() => {
    const query = search.q?.toLowerCase()
    return servicesEsblishment.filter((service) => {
      const queryStringName = query
        ? service.name.toLowerCase().includes(query)
        : true

      const queryStringDescription = query
        ? service.description.toLowerCase().includes(query)
        : true

      return queryStringName || queryStringDescription
    })
  }, [search.q, servicesEsblishment])

  const visibleServices = useMemo(() => {
    const start = (pagination.page - 1) * pagination.page_size
    const end = start + pagination.page_size
    return filteredServices.slice(start, end)
  }, [filteredServices, pagination.page, pagination.page_size])

  console.log(filteredServices.length, pagination.page_size)

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
    <Box spaceY="4" w="full">
      {isPendingPagination && (
        <VStack colorPalette={colorDefaultTheme}>
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Carregando dados...</Text>
        </VStack>
      )}

      {!isPendingPagination && (
        <SimpleGrid columns={{ base: 1, lg: 4 }} gap="2" w="full">
          <For each={visibleServices}>
            {(service) => (
              <CardServiceEsblishment key={service.id} service={service} />
            )}
          </For>
        </SimpleGrid>
      )}

      {filteredServices.length > 0 && (
        <HStack justify="space-between" w="full">
          <Flex align="center" gap="2">
            <PaginationTable
              count={filteredServices.length}
              pageSize={pagination.page_size}
              page={pagination.page}
              onPageChange={handlePageChange}
            />

            <SelectPageSize
              pages={[12, 24, 48]}
              search={{
                page: search?.page ?? 1,
                pageSize: search?.page_size ?? 12,
              }}
            />
          </Flex>

          <Box>
            <Text fontSize="sm" color="gray.400">
              {`Exibindo ${visibleServices.length} de ${filteredServices.length} serviços`}
            </Text>
          </Box>
        </HStack>
      )}
    </Box>
  )
}

export default ServicesListPage
