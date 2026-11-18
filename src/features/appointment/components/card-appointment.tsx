import {
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  Icon,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getRouteApi } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { CalendarIcon, ClockIcon, UserCircle2 } from 'lucide-react'
import { useMemo } from 'react'

import { cardCss } from '@/theme/styles/global-styles'

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import { appointmentLocalDate } from '../helpers/appointment-date'
import { appointmentStatusLabel } from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import MenuCardAppointment from './menu-card-appointment'

dayjs.locale('pt-br')

interface CardAppointmentProps {
  appointment: GetAppointmentByEstablishmentModel
}

const establishmentPage = getRouteApi('/_app/_authenticated/dashboard/$slug')

const CardAppointment = ({ appointment }: CardAppointmentProps) => {
  const { establishment } = establishmentPage.useLoaderData()
  const formatAppointmentDate = useMemo(() => {
    const appointmentDate = appointmentLocalDate(
      appointment.startsAt,
      establishment.timezone,
    )
    const formattedDateLocalePtBR = appointmentDate.locale('pt-br')
    const formattedAppointmentDate =
      formattedDateLocalePtBR.format('ddd, DD/MM/YYYY')
    const formattedAppointmentTime = formattedDateLocalePtBR.format('HH:mm')

    // const formattedDate = formattedDateLocalePtBR.format(
    //   'ddd, DD [de] MMMM [de] YYYY [às] HH:mm',
    // )
    const firstLetterAppointment = formattedAppointmentDate.at(0)?.toUpperCase()
    return {
      date: `${firstLetterAppointment}${formattedAppointmentDate.slice(1)}`,
      time: formattedAppointmentTime,
    }
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
        <h3>{appointment.serviceName}</h3>

        <MenuCardAppointment appointment={appointment} />
      </Card.Header>
      <Card.Body p="0" w="full" display="flex" flexDir="column" flex="1">
        <Box spaceY="2" w="full" flex="1">
          <Stack direction="row" gap="2">
            <HStack align="center">
              <Icon
                as={CalendarIcon}
                boxSize="4"
                color={{ _light: 'gray.600', _dark: 'gray.400' }}
              />

              <Text
                fontSize="sm"
                letterSpacing="wide"
                lineHeight="shorter"
                color={{ _light: 'gray.600', _dark: 'gray.400' }}
              >
                {formatAppointmentDate.date}
              </Text>
            </HStack>

            <HStack>
              <Icon
                as={ClockIcon}
                boxSize="4"
                color={{ _light: 'gray.600', _dark: 'gray.400' }}
              />

              <Text
                fontSize="sm"
                letterSpacing="wide"
                lineHeight="shorter"
                color={{ _light: 'gray.600', _dark: 'gray.400' }}
              >
                {formatAppointmentDate.time}
              </Text>
            </HStack>
          </Stack>
        </Box>

        <Separator
          my="2"
          orientation="horizontal"
          borderColor={{ _light: 'gray.200', _dark: 'secondary.500/20' }}
        />

        <HStack align="center" justify="space-between" w="full" flexWrap="wrap">
          <Flex
            align="center"
            gap="2"
            color={{ _light: 'tertiary.700', _dark: 'tertiary.500/80' }}
          >
            <Icon boxSize="4">
              <UserCircle2 />
            </Icon>

            <Text letterSpacing="wider" fontWeight="normal" fontSize="sm">
              {appointment.customerName}
            </Text>
          </Flex>

          <Badge
            rounded="lg"
            variant="outline"
            colorPalette={getBadgeAppointmentColor[appointment.status]}
            w="fit-content"
          >
            {appointmentStatusLabel[appointment.status]}
          </Badge>
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}

export default CardAppointment
