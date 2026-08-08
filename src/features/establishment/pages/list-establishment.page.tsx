import { Alert, Box, SimpleGrid } from '@chakra-ui/react'

import CardEstablishment from '../components/card-establishment'
import type { EstablishmentModel } from '../types/establishment.model'

interface ListEstablishmentPageProps {
  establishments: EstablishmentModel[]
}

const ListEstablishmentPage = ({
  establishments,
}: ListEstablishmentPageProps) => {
  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
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
    </Box>
  )
}

export default ListEstablishmentPage
