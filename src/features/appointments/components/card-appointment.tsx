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
import dayjs from 'dayjs'
import { UserCircle2 } from 'lucide-react'

import { cardCss } from '@/theme/styles/global-styles'

import { getBadgeBookingColor } from '../constants/get-badge-appointment-color'
import { bookingStatusLabel } from '../types/appointment-status.type'
import type { GetAppointmentByEstablishmentModel } from '../types/get-appointment-by-establishment.model'
import MenuCardAppointment from './menu-card-appointment'

dayjs.locale('pt-br')

interface CardAppointmentProps {
  appointment: GetAppointmentByEstablishmentModel
}

const CardAppointment = ({ appointment }: CardAppointmentProps) => {
  const formatAppointmentDate = (date: string) => {
    const formattedDate = dayjs(date).format(
      'ddd, DD [de] MMMM [de] YYYY [às] HH:mm',
    )
    return formattedDate.at(0)?.toUpperCase() + formattedDate.slice(1)
  }

  return (
    <Card.Root
      variant="outline"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      css={cardCss}
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
          },
        }}
      >
        <h3>{appointment.service.name}</h3>

        <MenuCardAppointment appointment={appointment} />
      </Card.Header>
      <Card.Body p="0" w="full" display="flex" flexDir="column" flex="1">
        <Box spaceY="1" w="full" flex="1">
          <Text
            fontSize="sm"
            letterSpacing="wide"
            color={{ base: 'gray.600', _dark: 'gray.400' }}
          >
            {formatAppointmentDate(appointment.date)}
          </Text>

          <HStack align="center" w="full">
            <Text
              fontSize="sm"
              letterSpacing="wide"
              color={{ base: 'gray.600', _dark: 'gray.400' }}
            >
              Status:
            </Text>

            <Badge
              colorPalette={getBadgeBookingColor[appointment.status]}
              w="fit-content"
            >
              {bookingStatusLabel[appointment.status]}
            </Badge>
          </HStack>
        </Box>

        <Separator
          my="2"
          orientation="horizontal"
          borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
        />

        <Flex
          align="center"
          gap="2"
          color={{ base: 'gray.400', _dark: 'gray.500' }}
        >
          <Icon boxSize="4">
            <UserCircle2 />
          </Icon>
          <Text letterSpacing="wide" fontWeight="light" fontSize="sm">
            {appointment.user.name}
          </Text>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}

export default CardAppointment
