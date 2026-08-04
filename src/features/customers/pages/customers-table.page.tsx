import {
  Alert,
  Box,
  ButtonGroup,
  chakra,
  Flex,
  For,
  HStack,
  IconButton,
  Pagination,
  SimpleGrid,
  Skeleton,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useParams, useSearch } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'

import { Status } from '@/components/ui/status'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { usePagination } from '@/shared/hooks/use-pagination'
import { formattedDateAndHours } from '@/shared/utils/formatted-date'
import { formattedPhone } from '@/shared/utils/formatted-mask'

import MenuActionsTableCustomers from '../components/menu-actions-table-collaborator'
import { useGetAllCustomersByEstablishment } from '../hooks/use-get-all-customers-esblishment'

const CustomersTable = () => {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/customers/',
  })

  const search = useSearch({
    from: '/dashboard/$establishmentId/customers/',
  })

  const {
    data: customers = [],
    error: errorCustomers,
    isLoading: isLoadingCustomers,
  } = useGetAllCustomersByEstablishment(establishmentId)

  const loadCustomers = useMemo(() => {
    const mapGenderLabel: Record<string, string> = {
      male: 'Masculino',
      female: 'Feminino',
      other: 'Outro',
    } as const

    return customers.map((customer) => ({
      ...customer,
      name: customer.name,
      email: customer.email,
      gender: mapGenderLabel[customer.gender] ?? customer.gender,
      birthDate: formattedDateAndHours(customer.birthDate),
    }))
  }, [customers])

  const {
    pagination,
    isPendingPagination,
    loadTablePagination,
    handlePaginationChange,
  } = usePagination(loadCustomers)

  const loadTableCustomres = useMemo(() => {
    const header = [
      'Nome',
      'E-mail',
      'Sexo',
      'Celulares',
      'Ativos',
      'Data de Nasc.',
    ]
    const query = search.q?.toLowerCase()

    const rows = loadTablePagination.filter((customer) => {
      const queryStringName = query
        ? customer.name.toLowerCase().includes(query)
        : true

      const queryStringEmail = query
        ? customer.email.toLowerCase().includes(query)
        : true

      return queryStringName || queryStringEmail
    })

    return {
      header,
      rows,
    }
  }, [loadTablePagination, search.q])

  if (errorCustomers) {
    return (
      <Alert.Root status="error" rounded="lg" mt="4">
        <Alert.Indicator />
        <Alert.Title>Error: {errorCustomers?.message}</Alert.Title>
      </Alert.Root>
    )
  }

  if (isLoadingCustomers) {
    return (
      <Stack gap="2" w="full" mt="4">
        <For each={[1, 2, 3]}>
          {(item) => (
            <Skeleton
              key={item}
              height="60px"
              rounded="lg"
              bg={{ base: 'gray.200', _dark: 'gray.700/70' }}
            />
          )}
        </For>
      </Stack>
    )
  }

  return (
    <Stack direction={{ base: 'column' }} w="full" mt="4">
      {isPendingPagination && (
        <VStack colorPalette={colorDefaultTheme}>
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Carregando dados...</Text>
        </VStack>
      )}

      {!isPendingPagination && (
        <>
          {loadTableCustomres.rows.map((row, index) => (
            <Flex key={index} direction={{ base: 'row', md: 'column' }}>
              <SimpleGrid
                gap={3}
                columns={{ base: 1, md: loadTableCustomres.header.length + 1 }}
                w={{ base: 120, md: 'full' }}
                textTransform="uppercase"
                bg={{ base: 'gray.100', _dark: 'gray.950/40' }}
                color={'gray.500'}
                py={{ base: 1, md: 4 }}
                px={{ base: 2, md: 10 }}
                fontSize="md"
                fontWeight="hairline"
                roundedTop={index === 0 ? 'xl' : undefined}
              >
                <For each={loadTableCustomres.header}>
                  {(item) => <span key={item}>{item}</span>}
                </For>
                <chakra.span textAlign={{ md: 'right' }}>Ações</chakra.span>
              </SimpleGrid>

              <SimpleGrid
                gap={3}
                columns={{ base: 1, md: loadTableCustomres.header.length + 1 }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
                bg={{ base: 'primary.100', _dark: 'primary.900/40' }}
                roundedBottom={
                  index === loadTableCustomres.rows.length - 1
                    ? 'xl'
                    : undefined
                }
              >
                <span>{row.name}</span>
                <span>{row.email}</span>
                <span>{row.gender}</span>
                <Text as="span" truncate>
                  {row.phones.map(formattedPhone).join(', ')}
                </Text>
                <span>
                  <Status value={row.active ? 'success' : 'error'}>
                    {row.active ? 'Ativo' : 'Inativo'}
                  </Status>
                </span>
                <span>{row.birthDate}</span>

                <Flex justify={{ md: 'end' }}>
                  <MenuActionsTableCustomers customer={row} />
                </Flex>
              </SimpleGrid>
            </Flex>
          ))}
        </>
      )}

      {customers.length > pagination.page_size && (
        <HStack justify="space-between" w="full">
          <Pagination.Root
            count={customers.length}
            pageSize={pagination.page_size}
            page={pagination.page}
            onPageChange={handlePaginationChange}
          >
            <ButtonGroup alignSelf="end" size="sm" variant="subtle">
              <Pagination.PrevTrigger asChild>
                <IconButton aria-label="Página anterior" rounded="xl">
                  <ChevronLeft />
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
                  <ChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>

          <Box>
            <Text fontSize="sm" color="gray.400">
              {`Exibindo ${pagination.page_size} de ${customers.length} clientes`}
            </Text>
          </Box>
        </HStack>
      )}
    </Stack>
  )
}

export default CustomersTable
