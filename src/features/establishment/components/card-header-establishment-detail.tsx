import { Badge, Box, HStack, Separator, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

import {
  type EstablishmentStatusType,
  mapStatusEstablishment,
} from '../types/establishment-status.type'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

interface CardHeaderEstablishmentDetailProps {
  establishment: {
    name: string
    status: EstablishmentStatusType
    openingHours: {
      day: number
      intervals: { open: string; close: string }[]
    }[]
  }
}

const CardHeaderEstablishmentDetail = ({
  establishment,
}: CardHeaderEstablishmentDetailProps) => {
  const statusEstablishmentMap = mapStatusEstablishment(establishment.status)
  const establishmentOpeningStatus = useMemo<{
    establishmentOpen: boolean
    openingHours: string
  }>(() => validateOpeningHoursEstablishment(establishment), [establishment])

  return (
    <Box spaceY="1" mt="1" minW="0" overflowWrap="anywhere">
      <Text as="h2" lineHeight="1">
        {establishment?.name ?? 'Carregando...'}
      </Text>

      <HStack align="center" flexWrap="wrap">
        <Text
          lineHeight="1"
          fontSize="sm"
          letterSpacing="wide"
          fontWeight="light"
          color={{ base: 'primary.500', _dark: 'emerald.300/50' }}
        >
          {establishmentOpeningStatus.openingHours}
        </Text>

        <Separator
          h="4"
          orientation="vertical"
          borderColor={{ base: 'gray.200', _dark: 'gray.500' }}
        />

        <Badge
          size="sm"
          colorPalette={
            establishmentOpeningStatus.establishmentOpen ? 'green' : 'red'
          }
        >
          {establishmentOpeningStatus.establishmentOpen ? 'Aberto' : 'Fechado'}
        </Badge>
      </HStack>

      <HStack gap="1" align="center">
        <Text fontSize="xs">Status:</Text>

        <Badge
          size="xs"
          variant="surface"
          colorPalette={statusEstablishmentMap.color}
        >
          {statusEstablishmentMap.label}
        </Badge>
      </HStack>
    </Box>
  )
}

export default CardHeaderEstablishmentDetail
