import {
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  Icon,
  Separator,
  Text,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { UserCircle2 } from 'lucide-react'
import { useMemo } from 'react'

import { cardCss } from '@/theme/styles/global-styles'

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import { appointmentStatusLabel } from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import { appointmentLocalDate } from '../utils/appointment-date'
import MenuCardAppointment from './menu-card-appointment'

dayjs.locale('pt-br')

interface CardAppointmentProps {
  appointment: GetAppointmentByEstablishmentModel
}

const establishmentPage = getRouteApi('/_app/_authenticated/dashboard/$slug')

const CardAppointment = ({ appointment }: CardAppointmentProps) => {
  const { establishment } = establishmentPage.useLoaderData()

  const formatAppointmentDate = useMemo(() => {
    const formattedDate = appointmentLocalDate(
      appointment.startsAt,
      establishment.timezone,
    ).format('ddd, DD [de] MMMM [de] YYYY [às] HH:mm')

    return formattedDate.at(0)?.toUpperCase() + formattedDate.slice(1)
  }, [appointment.startsAt, establishment.timezone])

  return (
    <Card.Root
      variant="subtle"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      css={cardCss}
      borderLeftWidth="4px"
      borderLeftColor={{
        _light: `${getBadgeAppointmentColor[appointment.status]}.500`,
        _dark: `${getBadgeAppointmentColor[appointment.status]}.600`,
      }}
      outlineWidth="1px"
      outlineStyle="solid"
      outlineColor={{ _light: 'gray.200', _dark: 'secondary.500/20' }}
    >
      <Card.Header
        w="full"
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        p="0"
        mb="2"
        css={{
          '& h3': {
            color: 'primary.500',
            _dark: { color: 'primary.200' },
            letterSpacing: 'wider',
            fontWeight: 'medium',
            minW: '0',
            overflowWrap: 'anywhere',
          },
        }}
      >
        <h3>{appointment.serviceNameSnapshot}</h3>

        <MenuCardAppointment appointment={appointment} />
      </Card.Header>
      <Card.Body p="0" w="full" display="flex" flexDir="column" flex="1">
        <Box spaceY="1" w="full" flex="1">
          <Text
            fontSize="sm"
            letterSpacing="wide"
            color={{ _light: 'gray.600', _dark: 'gray.400' }}
          >
            {formatAppointmentDate}
          </Text>

          <HStack align="center" w="full" flexWrap="wrap">
            <Text
              fontSize="sm"
              letterSpacing="wide"
              color={{ _light: 'gray.600', _dark: 'gray.400' }}
            >
              Status:
            </Text>

            <Badge
              colorPalette={getBadgeAppointmentColor[appointment.status]}
              w="fit-content"
            >
              {appointmentStatusLabel[appointment.status]}
            </Badge>
          </HStack>
        </Box>

        <Separator
          my="2"
          orientation="horizontal"
          borderColor={{ _light: 'gray.200', _dark: 'secondary.500/20' }}
        />

        <Flex
          align="center"
          gap="2"
          color={{ _light: 'tertiary.700', _dark: 'tertiary.500/80' }}
        >
          <Icon boxSize="4">
            <UserCircle2 />
          </Icon>

          <Text letterSpacing="wider" fontWeight="normal" fontSize="sm">
            {appointment.customerNameSnapshot}
          </Text>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}

export default CardAppointment
