import {
  Alert,
  Box,
  Flex,
  type PaginationPageChangeDetails,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo, useTransition } from 'react'

import PaginationTable from '@/components/layout/pagination-table'
import SelectPageSize from '@/components/layout/select-page-size'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import CardEstablishment from '../components/card-establishment'
import type { EstablishmentModel } from '../types/establishment.model'

interface ListEstablishmentPageProps {
  establishments: EstablishmentModel[]
}

const ListEstablishmentPage = ({
  establishments,
}: ListEstablishmentPageProps) => {
  const [isPendingPagination, startTransition] = useTransition()
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      page_size: parseAsInteger.withDefault(4).withOptions({
        clearOnDefault: false,
      }),
    },
    {
      shallow: false,
    },
  )
  const search = useSearch({ from: '/_authenticated/establishment/' })

  const visibleEstablishments = useMemo(() => {
    const start = (pagination.page - 1) * pagination.page_size
    const end = start + pagination.page_size
    return establishments.slice(start, end)
  }, [establishments, pagination.page, pagination.page_size])

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    startTransition(() => {
      setPagination({
        page: details.page,
        page_size: details.pageSize,
      })
    })
  }

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      {establishments.length === 0 && (
        <Alert.Root status="warning" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>Nenhum estabelecimento encontrado</Alert.Title>
        </Alert.Root>
      )}

      {establishments.length >= 1 && (
        <>
          {isPendingPagination && (
            <VStack colorPalette={colorDefaultTheme}>
              <Spinner color="colorPalette.600" />
              <Text color="colorPalette.600">Carregando dados...</Text>
            </VStack>
          )}

          {!isPendingPagination && (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
              {visibleEstablishments.map((establishment) => (
                <CardEstablishment
                  key={establishment.id}
                  establishment={establishment}
                />
              ))}
            </SimpleGrid>
          )}

          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            justify="space-between"
            w="full"
          >
            <Flex
              flexDir={{ base: 'column', md: 'row' }}
              align="center"
              gap="2"
            >
              <PaginationTable
                count={establishments.length}
                pageSize={pagination.page_size}
                page={pagination.page}
                onPageChange={handlePageChange}
              />

              <SelectPageSize
                pages={[4, 24, 48]}
                search={{
                  page: search?.page ?? 1,
                  pageSize: search?.page_size ?? 4,
                }}
              />
            </Flex>

            <Box
              textAlign={{ base: 'center', md: 'right' }}
              mt={{ base: '2', md: '0' }}
            >
              <Text fontSize="sm" color="gray.400">
                {`Exibindo ${visibleEstablishments.length} de ${establishments.length} estabelecimentos`}
              </Text>
            </Box>
          </Flex>
        </>
      )}
    </Box>
  )
}

export default ListEstablishmentPage
