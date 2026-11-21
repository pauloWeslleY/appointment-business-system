import {
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  Icon,
  Image,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FileImageIcon } from 'lucide-react'

import { formatCurrencyInCents } from '@/shared/utils/formatted-price'
import { cardCss } from '@/theme/styles/global-styles'

import { mapColorStatusServiceEstablishment } from '../helpers/status-service-establishement'
import type { ListServicesEstablishmentModel } from '../types/list-services-establishment.model'
import { formattedDurationInMinutesService } from '../utils/formatted-duration-in-minutes-service'
import MenuActionServicesTable from './menu-action-services-table'
import StatusServiceEstablishment from './status-service-establishment'

interface CardServiceEstablishmentProps {
  service: ListServicesEstablishmentModel
}

const CardServiceEstablishment = ({
  service,
}: CardServiceEstablishmentProps) => {
  const mapStatus = mapColorStatusServiceEstablishment(service.status, 'color')
  const formattedDuration = formattedDurationInMinutesService(
    service.durationInMinutes ?? 0,
  )

  return (
    <Card.Root variant="outline" css={cardCss}>
      <Card.Header
        p="0"
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        pb="1.5"
        borderBottomWidth="4px"
        borderColor={{
          _light: `${mapStatus.color}.500`,
          _dark: `${mapStatus.color}.300`,
        }}
      >
        <HStack gap="2" align="center" minW="0" flexWrap="wrap">
          <Text overflowWrap="anywhere">{service.name}</Text>

          <Separator
            orientation="vertical"
            height="6"
            borderColor={{ _light: 'gray.200', _dark: 'secondary.500/20' }}
          />

          <StatusServiceEstablishment status={service.status} color="color" />
        </HStack>

        <div>
          <MenuActionServicesTable service={service} />
        </div>
      </Card.Header>

      <Card.Body
        p="0"
        display="flex"
        flexDir="row"
        alignItems="center"
        gap="4"
        py="2"
      >
        <Box flexShrink="0">
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
            <Flex
              justify="center"
              align="center"
              bg={{ _light: 'gray.200', _dark: 'slate.800/30' }}
              rounded="xl"
              p="2"
              h="20"
              w="28"
            >
              <Icon as={FileImageIcon} boxSize="12" />
            </Flex>
          )}
        </Box>

        <VStack align="start" gap="1" minW="0" overflowWrap="anywhere">
          <Text
            truncate
            fontSize="sm"
            letterSpacing="wide"
            color={{ _light: 'gray.700', _dark: 'gray.400' }}
          >
            {service.description}
          </Text>
          <Text
            fontSize="sm"
            letterSpacing="wide"
            color={{ _light: 'gray.700', _dark: 'gray.400' }}
          >
            {formattedDuration}
          </Text>
          <Badge size="sm" variant="surface" colorPalette="emerald">
            {formatCurrencyInCents(service.servicePriceInCents)}
          </Badge>
        </VStack>
      </Card.Body>
    </Card.Root>
  )
}

export default CardServiceEstablishment
