import { Badge, Box, Flex, Icon, Image, Text, VStack } from '@chakra-ui/react'
import { FileImage } from 'lucide-react'

import { formatCurrencyInCents } from '@/shared/utils/formatted-price'

import type { ServiceEstablishmentModel } from '../types/service-esatablishment.model'
import MenuActionServicesTable from './menu-action-services-table'

interface CardServiceEsblishmentProps {
  service: ServiceEstablishmentModel
}

const CardServiceEsblishment = ({ service }: CardServiceEsblishmentProps) => {
  return (
    <Flex
      align="center"
      gap="4"
      p="2"
      rounded="xl"
      shadow="xs"
      borderWidth="1px"
      bg={{ base: 'primary.100/40', _dark: 'primary.800/40' }}
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
    >
      <Flex align="center" flex="1">
        <Box>
          {service.imageUrl && (
            <Image
              src={service.imageUrl}
              alt={service.name}
              boxSize="50px"
              objectFit="cover"
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

        <VStack align="start" gap="1" ml="4">
          <Text
            fontSize="sm"
            color={{ base: 'primary.700', _dark: 'primary.200' }}
          >
            {service.name}
          </Text>
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
      </Flex>

      <Box>
        <MenuActionServicesTable service={service} />
      </Box>
    </Flex>
  )
}

export default CardServiceEsblishment
