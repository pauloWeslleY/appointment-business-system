import {
  Alert,
  Box,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'

import SearchPage from '@/components/search-page'

import CardEstablishment from '../components/card-establishment'
import NotFoundEstablishment from '../components/not-found-establishment'
import { useGetEstablishmentsByOwner } from '../hooks/use-get-esblishment-by-owner'

const ListEstablishmentPage = () => {
  const search = useSearch({
    from: '/_authenticated/establishment/',
  })

  const {
    filteredEstablishments,
    errorEstablishments,
    isLoadingEstablishments,
  } = useGetEstablishmentsByOwner(search.q)

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
    <Box spaceY={{ base: '4', lg: '6' }}>
      <div>
        <SearchPage w="350px" />
      </div>

      {filteredEstablishments.length === 0 && (
        <Alert.Root status="warning" rounded="xl">
          <Alert.Indicator />
          <Alert.Title>Nenhum estabelecimento encontrado</Alert.Title>
        </Alert.Root>
      )}

      {filteredEstablishments.length >= 1 && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4" w="full">
          {filteredEstablishments.map((establishment) => (
            <CardEstablishment
              key={establishment.id}
              establishment={establishment}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}

export default ListEstablishmentPage
