import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Icon,
  Image,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import {
  ExternalLinkIcon,
  FileImage,
  PencilLineIcon,
  StarIcon,
} from 'lucide-react'
import { useMemo } from 'react'

import { useStorageImage } from '@/shared/hooks/use-get-storage-image'
import { weekDaysLabels } from '@/shared/utils/create-list-weekdays'
import { formattedPhone } from '@/shared/utils/formatted-mask'
import { cardCss } from '@/theme/styles/global-styles'

import { formattedDateAndHours } from '../../../shared/utils/formatted-date'
import type { EstablishmentModel } from '../types/establishment.model'
import { validateOpeningHoursEstablishment } from '../utils/validate-opening-hours-establishment'
import SidebarInfoEstablishment from './sidebar-info-establishment'

interface CardEstablishmentProps {
  establishment: EstablishmentModel
}

const validateImageUrlEstablishment = (imageUrl?: string | null) => {
  if (!imageUrl) return null
  return imageUrl.startsWith('establishment/') ? imageUrl : null
}

const CardEstablishment = ({ establishment }: CardEstablishmentProps) => {
  const { data: imageUrl } = useStorageImage(
    validateImageUrlEstablishment(establishment.imageUrl),
  )
  const navigate = useNavigate()

  const bannerEstablishment = imageUrl ?? establishment.imageUrl
  const formatPhone = establishment.phones.map(formattedPhone).join(' - ')
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
        display="flex"
        flexDir="row"
        gap="2"
        borderBottomWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <Box alignSelf="center">
          {bannerEstablishment && (
            <Image
              src={bannerEstablishment}
              alt={establishment.name}
              h="20"
              w="28"
              rounded="lg"
            />
          )}

          {!bannerEstablishment && (
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

        <VStack align="start" gap="2" w="full">
          <Flex align="center" justify="space-between" w="full">
            <Text
              color={{ base: 'primary.500', _dark: 'primary.200' }}
              letterSpacing="wider"
              fontWeight="medium"
            >
              {establishment.name}
            </Text>

            <SidebarInfoEstablishment
              establishment={establishment}
              establishmentOpen={loadEstablishmentDetails.establishmentOpen}
            />
          </Flex>

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
              {loadEstablishmentDetails.establishmentOpen
                ? 'Aberto'
                : 'Fechado'}
            </Badge>
          </HStack>

          <Text
            fontSize="sm"
            letterSpacing="wide"
            color={{ base: 'gray.600', _dark: 'gray.400' }}
          >
            {formatPhone}
          </Text>

          <Box spaceY="2">
            <HStack>
              <Text
                fontSize="sm"
                letterSpacing="wide"
                color={{ base: 'gray.600', _dark: 'gray.400' }}
              >
                {establishment.totalServices} serviços
              </Text>

              <Separator orientation="vertical" height="4" />

              <Text
                fontSize="sm"
                letterSpacing="wide"
                color={{ base: 'gray.600', _dark: 'gray.400' }}
              >
                {establishment.totalCollaborators} colaboradores
              </Text>

              <Separator orientation="vertical" height="4" />

              <Flex gap="2" align="center">
                <HStack align="center" gap="1">
                  <Text
                    lineHeight="0"
                    fontSize="sm"
                    letterSpacing="wide"
                    color={{ base: 'gray.600', _dark: 'gray.400' }}
                  >
                    {establishment.averageRating.toFixed(1)}
                  </Text>

                  <Icon as={StarIcon} boxSize="4" color="yellow.400" />
                </HStack>

                {' - '}

                <Text
                  lineHeight="0"
                  fontSize="sm"
                  letterSpacing="wide"
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                >
                  {establishment.totalRatings} avaliações
                </Text>
              </Flex>
            </HStack>

            <HStack align="center" gap="1">
              <Text
                lineHeight="0"
                fontSize="sm"
                letterSpacing="wide"
                color={{ base: 'gray.600', _dark: 'gray.400' }}
              >
                Hoje: {establishment.todayBookingsTotal} agendamentos
              </Text>

              <Separator orientation="vertical" height="4" />

              <Text
                lineHeight="0"
                fontSize="sm"
                letterSpacing="wide"
                color={{ base: 'gray.600', _dark: 'gray.400' }}
              >
                Próximo:{' '}
                {formattedDateAndHours(establishment.nextBookingAt, true)}
              </Text>
            </HStack>

            <Text
              letterSpacing="wide"
              color={{ base: 'gray.600', _dark: 'gray.500' }}
              fontSize="sm"
            >
              {establishment.openingHours
                .map((hour) => `${weekDaysLabels[hour.day].slice(0, 3)}`)
                .join(' - ')}
            </Text>
          </Box>
        </VStack>
      </Card.Body>
      <Card.Footer p="0" w="full" mt="2">
        <Button
          colorPalette="emerald"
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
          colorPalette="emerald"
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
