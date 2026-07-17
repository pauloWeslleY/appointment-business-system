import { Button, Card, Flex, For, HStack, Icon, Text } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { ExternalLinkIcon, PencilLineIcon, Store } from 'lucide-react'

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

  const loadEstablishmentInfo = [
    {
      label: 'Descrição',
      value: establishment.description,
    },
    {
      label: 'Telefone',
      value: establishment.phones.map(formatPhone).join(' - '),
    },
  ]

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
    >
      <Card.Header w="full" display="flex" flexDir="row" alignItems="center">
        <Flex
          gap="2"
          align="center"
          justify="center"
          bg={{ base: 'colorPalette.300', _dark: 'colorPalette.700' }}
          p="2"
          rounded="full"
          w="fit-content"
        >
          <Icon as={Store} boxSize="6" />
        </Flex>

        <Text
          letterSpacing="wide"
          fontWeight="light"
          color={{ base: 'colorPalette.600', _dark: 'colorPalette.300' }}
        >
          {establishment.name}
        </Text>
      </Card.Header>
      <Card.Body
        w="full"
        borderBottomWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <For each={loadEstablishmentInfo}>
          {(item) => (
            <HStack w="full" gap="1">
              <Text fontWeight="light">{item.label}:</Text>
              <Text
                fontWeight="semibold"
                color={{
                  base: 'colorPalette.500',
                  _dark: 'colorPalette.600',
                }}
              >
                {item.value}
              </Text>
            </HStack>
          )}
        </For>
      </Card.Body>
      <Card.Footer p="2" w="full">
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
