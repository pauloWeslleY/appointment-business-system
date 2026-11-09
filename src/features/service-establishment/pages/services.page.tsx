import {
  Alert,
  Box,
  Flex,
  For,
  HStack,
  type PaginationPageChangeDetails,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useTransition } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import SelectPageSize from '@/components/layout/select-page-size'
import Loader from '@/components/loader'

import CardServiceEstablishment from '../components/card-service-establishment'
import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'

interface ServicesListPageProps {
  services: ListServicesEstablishmentModel[]
  total: number
}

const ServicesListPage = ({ services, total }: ServicesListPageProps) => {
  const [isPendingPagination, startTransition] = useTransition()
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(12).withOptions({
        clearOnDefault: false,
      }),
    },
    {
      shallow: true,
    },
  )

  const search = useSearch({
    from: '/_app/_authenticated/dashboard/$slug/services/',
  })

  const visibleServices = services

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  if (total === 0) {
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
      {isPendingPagination && <Loader h="28" message="Carregando dados..." />}

      {!isPendingPagination && (
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3, '2xl': 4 }}
          gap="2"
          w="full"
        >
          <For each={visibleServices}>
            {(service) => (
              <CardServiceEstablishment key={service.id} service={service} />
            )}
          </For>
        </SimpleGrid>
      )}

      {total > 0 && (
        <HStack justify="space-between" w="full" flexWrap="wrap" gap="3">
          <Flex align="center" gap="2" flexWrap="wrap" maxW="full">
            <PaginationTable
              count={total}
              pageSize={pagination.page_size}
              page={pagination.page}
              onPageChange={handlePageChange}
            />

            <SelectPageSize
              shallow
              pages={[12, 24, 48]}
              search={{
                page: search?.page ?? 1,
                pageSize: search?.page_size ?? 12,
              }}
            />
          </Flex>

          <Box>
            <Text fontSize="sm" color="gray.400">
              {`Exibindo ${visibleServices.length} de ${total} serviços`}
            </Text>
          </Box>
        </HStack>
      )}
    </Box>
  )
}

export default ServicesListPage
