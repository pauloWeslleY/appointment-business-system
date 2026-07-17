import {
  Alert,
  Box,
  Icon,
  Image,
  Skeleton,
  Stack,
  Table,
} from '@chakra-ui/react'
import { useParams } from '@tanstack/react-router'
import { FileImage } from 'lucide-react'

import { useGetServiceByEstablishment } from '@/features/service-establishment/hooks/use-get-service-by-establishment'

import MenuActionServicesTable from './menu-action-services-table'

const ServicesTable = () => {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/services/',
  })

  const {
    data: servicesEsblishment = [],
    isLoading: isLoadingServicesEstablishment,
    error: errorServicesEstablishment,
  } = useGetServiceByEstablishment(establishmentId)

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
        {servicesEsblishment.map((item) => (
          <Table.Row
            key={item.id}
            transition="colors"
            bg={{ base: 'white', _dark: 'gray.950/40' }}
            _hover={{ bg: { base: 'gray.100', _dark: 'colorPalette.900/30' } }}
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
              ${(item.servicePriceInCents / 100).toFixed(2)}
            </Table.Cell>
            <Table.Cell textAlign="end">
              <MenuActionServicesTable service={item} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default ServicesTable
