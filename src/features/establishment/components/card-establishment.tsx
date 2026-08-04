import {
  Badge,
  Button,
  Card,
  HStack,
  Icon,
  Separator,
  Text,
} from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { ExternalLinkIcon, PencilLineIcon } from 'lucide-react'
import { useMemo } from 'react'

import { weekDaysLabels } from '@/shared/utils/create-list-weekdays'
import { FormatMask, formatterMask } from '@/shared/utils/formatted-mask'
import { cardCss } from '@/theme/styles/global-styles'

import type { EstablishmentModel } from '../types/establishment.model'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'

interface CardEstablishmentProps {
  establishment: EstablishmentModel
}

const CardEstablishment = ({ establishment }: CardEstablishmentProps) => {
  const navigate = useNavigate()

  const formatPhone = (phone: string) => {
    return formatterMask(phone, FormatMask.CELLPHONE)
  }

  const loadEstablishmentDetails = useMemo(
    () => validateOpeningHoursEstablishment(establishment),
    [establishment],
  )

  return (
    <Card.Root
      variant="outline"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      css={cardCss}
    >
      <Card.Body
        p="0"
        pb="2"
        w="full"
        spaceY="1"
        borderBottomWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <Text
          color={{ base: 'primary.500', _dark: 'primary.200' }}
          letterSpacing="wider"
          fontWeight="medium"
        >
          {establishment.name}
        </Text>

        <Text
          fontSize="sm"
          letterSpacing="wide"
          color={{ base: 'gray.600', _dark: 'gray.400' }}
          truncate
        >
          {establishment.description}
        </Text>

        <HStack align="center">
          <Text
            fontSize="sm"
            letterSpacing="wide"
            color={{ base: 'gray.600', _dark: 'gray.400' }}
          >
            {loadEstablishmentDetails.openingHours}
          </Text>

          <Separator
            h="4"
            orientation="vertical"
            borderColor={{ base: 'gray.200', _dark: 'gray.500' }}
          />

          <Badge
            size="sm"
            colorPalette={
              loadEstablishmentDetails.establishmentOpen ? 'green' : 'red'
            }
          >
            {loadEstablishmentDetails.establishmentOpen ? 'Aberto' : 'Fechado'}
          </Badge>
        </HStack>

        <Text
          fontSize="sm"
          letterSpacing="wide"
          color={{ base: 'gray.600', _dark: 'gray.400' }}
        >
          {establishment.phones.map(formatPhone).join(' - ')}
        </Text>

        <Text
          letterSpacing="wide"
          color={{ base: 'gray.600', _dark: 'gray.500' }}
          fontSize="sm"
        >
          {establishment.openingHours
            .map((hour) => `${weekDaysLabels[hour.day].slice(0, 3)}`)
            .join(' - ')}
        </Text>
      </Card.Body>
      <Card.Footer p="0" w="full" mt="2">
        <Button
          colorPalette="primary"
          variant="ghost"
          rounded="xl"
          size="sm"
          flex="1"
          onClick={() =>
            navigate({
              to: '/establishment/$establishmentId',
              params: { establishmentId: establishment.id },
              search: { tab: 'edit' },
            })
          }
        >
          <Icon as={PencilLineIcon} boxSize="4" />
          Editar
        </Button>
        <Button
          colorPalette="primary"
          variant="ghost"
          rounded="xl"
          size="sm"
          flex="1"
          onClick={() =>
            navigate({
              to: '/dashboard/$establishmentId/overview',
              params: { establishmentId: establishment.id },
            })
          }
        >
          <Icon as={ExternalLinkIcon} boxSize="4" />
          Ir para estabelecimento
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

export default CardEstablishment
