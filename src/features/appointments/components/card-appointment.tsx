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

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import { appointmentStatusLabel } from '../types/appointment-status.type'
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
      rounded="xl"
      shadow="xs"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      bg={{ base: 'white', _dark: 'gray.950/40' }}
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      p="2"
    >
      <Card.Header
        w="full"
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        p="0"
        mb="2"
      >
        {appointment.service.name}

        <MenuCardAppointment appointment={appointment} />
      </Card.Header>
      <Card.Body p="0" w="full" display="flex" flexDir="column" flex="1">
        <Box spaceY="1" w="full" flex="1">
          <Text
            fontSize="sm"
            letterSpacing="wide"
            fontWeight="light"
            color="colorPalette.500"
          >
            {formatAppointmentDate(appointment.date)}
          </Text>

          <HStack align="center" w="full">
            <Text
              fontSize="sm"
              letterSpacing="wide"
              fontWeight="light"
              color={{ base: 'gray.600', _dark: 'gray.400' }}
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
