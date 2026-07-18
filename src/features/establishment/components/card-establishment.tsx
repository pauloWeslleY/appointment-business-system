import { Button, Card, Icon, Text } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { ExternalLinkIcon, PencilLineIcon } from 'lucide-react'

import { weekDaysLabels } from '@/shared/utils/create-list-weekdays'
import { FormatMask, formatterMask } from '@/shared/utils/formatted-mask'

import type { EstablishmentModel } from '../types/establishment.model'

interface CardEstablishmentProps {
  establishment: EstablishmentModel
}

const CardEstablishment = ({ establishment }: CardEstablishmentProps) => {
  const navigate = useNavigate()

  const formatPhone = (phone: string) => {
    return formatterMask(phone, FormatMask.CELLPHONE)
  }

  return (
    <Card.Root
      variant="outline"
      rounded="xl"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      bg={{ base: 'white', _dark: 'gray.950/40' }}
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      p="2"
    >
      <Card.Body
        p="0"
        pb="2"
        w="full"
        borderBottomWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <Text
          letterSpacing="wide"
          fontWeight="medium"
          color={{ base: 'colorPalette.600', _dark: 'colorPalette.300' }}
        >
          {establishment.name}
        </Text>

        <Text
          letterSpacing="wide"
          fontWeight="light"
          color={{ base: 'colorPalette.500', _dark: 'colorPalette.600' }}
        >
          {establishment.description}
        </Text>

        <Text
          letterSpacing="wide"
          fontWeight="light"
          color={{ base: 'colorPalette.500', _dark: 'colorPalette.600' }}
        >
          {establishment.phones.map(formatPhone).join(' - ')}
        </Text>

        <Text
          letterSpacing="wide"
          fontWeight="light"
          color={{ base: 'gray.600', _dark: 'gray.500' }}
          fontSize="sm"
          pt="2"
        >
          {establishment.openingHours
            .map((hour) => `${weekDaysLabels[hour.day].slice(0, 3)}`)
            .join(' - ')}
        </Text>
      </Card.Body>
      <Card.Footer p="0" w="full" mt="2">
        <Button
          variant="ghost"
          rounded="xl"
          size="sm"
          flex="1"
          onClick={() =>
            navigate({
              to: '/establishment/$establishmentId',
              params: { establishmentId: establishment.id },
            })
          }
        >
          <Icon as={PencilLineIcon} boxSize="4" />
          Editar
        </Button>
        <Button
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
