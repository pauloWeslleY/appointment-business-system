import {
  Badge,
  Box,
  Card,
  HStack,
  Icon,
  Image,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FileImage } from 'lucide-react'

import { formatCurrencyInCents } from '@/shared/utils/formatted-price'
import { cardCss } from '@/theme/styles/global-styles'

import type { ServiceEstablishmentModel } from '../types/service-esatablishment.model'
import MenuActionServicesTable from './menu-action-services-table'

interface CardServiceEsblishmentProps {
  service: ServiceEstablishmentModel
}

const CardServiceEsblishment = ({ service }: CardServiceEsblishmentProps) => {
  const colorMapStatus = service.status ? 'green' : 'red'

  return (
    <Card.Root variant="outline" css={cardCss}>
      <Card.Header
        p="0"
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        pb="1.5"
        borderBottomWidth="5px"
        borderColor={{
          base: `${colorMapStatus}.500`,
          _dark: `${colorMapStatus}.300`,
        }}
      >
        <HStack gap="2" align="center">
          <Text>{service.name}</Text>

          <Separator
            orientation="vertical"
            height="6"
            borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
          />

          <Badge size="sm" variant="subtle" colorPalette={colorMapStatus}>
            {service.status ? 'Ativo' : 'Inativo'}
          </Badge>
        </HStack>

        <Box>
          <MenuActionServicesTable service={service} />
        </Box>
      </Card.Header>

      <Card.Body
        p="0"
        display="flex"
        flexDir="row"
        alignItems="center"
        gap="4"
        py="2"
      >
        <Box>
          {service.imageUrl && (
            <Image
              src={service.imageUrl}
              alt={service.name}
              h="20"
              w="28"
              rounded="lg"
            />
          )}

          {!service.imageUrl && (
            <Box
              p="2"
              bg={{ base: 'gray.200', _dark: 'gray.800' }}
              rounded="full"
              w="fit-content"
            >
              <Icon as={FileImage} boxSize="6" />
            </Box>
          )}
        </Box>

        <VStack align="start" gap="1">
          <Text
            fontSize="sm"
            color={{ base: 'gray.700', _dark: 'gray.400' }}
            letterSpacing="wide"
          >
            {service.description}
          </Text>
          <Badge size="sm" variant="surface">
            {formatCurrencyInCents(service.servicePriceInCents)}
          </Badge>
        </VStack>
      </Card.Body>
    </Card.Root>
  )
}

export default CardServiceEsblishment
