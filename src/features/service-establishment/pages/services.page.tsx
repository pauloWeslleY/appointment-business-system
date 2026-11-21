import {
  Alert,
  Box,
  Flex,
  For,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'

import PaginationTable from '@/components/layout/pagination-table'
import SelectPageSize from '@/components/layout/select-page-size'
import Loader from '@/components/loader'

import CardServiceEstablishment from '../components/card-service-establishment'
import TableServicesEstablishment from '../components/table-services-establishment'
import { useServicesListPage } from '../hooks/use-services-list-page'
import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'

interface ServicesListPageProps {
  services: ListServicesEstablishmentModel[]
  totalServices: number
  isServicesTableViewMode: boolean
}

const ServicesListPage = ({
  services,
  totalServices,
  isServicesTableViewMode,
}: ServicesListPageProps) => {
  const {
    servicesPagination,
    servicesSearch,
    hasServices,
    isChangingServicesPage,
    visibleServicesCountLabel,
    changeServicesPage,
  } = useServicesListPage(services, totalServices)

  if (!hasServices) {
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
      {isChangingServicesPage && (
        <Loader h="28" message="Carregando dados..." />
      )}

      {!isChangingServicesPage && isServicesTableViewMode && (
        <TableServicesEstablishment services={services} />
      )}

      {!isChangingServicesPage && !isServicesTableViewMode && (
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3, '2xl': 4 }}
          gap="2"
          w="full"
        >
          <For each={services}>
            {(service) => (
              <CardServiceEstablishment key={service.id} service={service} />
            )}
          </For>
        </SimpleGrid>
      )}

      <HStack justify="space-between" w="full" flexWrap="wrap" gap="3">
        <Flex align="center" gap="2" flexWrap="wrap" maxW="full">
          <PaginationTable
            count={totalServices}
            pageSize={servicesPagination.page_size}
            page={servicesPagination.page}
            onPageChange={changeServicesPage}
          />

          <SelectPageSize
            shallow
            pages={[12, 24, 48]}
            search={{
              page: servicesSearch.page,
              pageSize: servicesSearch.page_size,
            }}
          />
        </Flex>

        <Box>
          <Text fontSize="sm" color="gray.400">
            {visibleServicesCountLabel}
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}

export default ServicesListPage
