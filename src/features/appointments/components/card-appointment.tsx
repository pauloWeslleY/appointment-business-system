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
import DialogEditAppointment from './dialog-update-appointment'
import DialogUpdateStatusAppointment from './dialog-update-status-appointment'

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
        display="flex"
        flexDir="column"
        flex="1"
        borderBottomWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <Box w="full" flex="1">
          <Text
            letterSpacing="wide"
            fontWeight="medium"
            fontSize="sm"
            color={{ base: 'colorPalette.600', _dark: 'colorPalette.300' }}
          >
            {appointment.service.name}
          </Text>

          <Text
            letterSpacing="wide"
            fontWeight="light"
            color={{ base: 'colorPalette.500', _dark: 'colorPalette.600' }}
          >
            {formatAppointmentDate(appointment.date)}
          </Text>
        </Box>

        <HStack align="center" w="full" justifySelf="flex-end">
          <Flex
            align="center"
            gap="2"
            color={{ base: 'gray.400', _dark: 'gray.500' }}
          >
            <Icon boxSize="4">
              <UserCircle2 />
            </Icon>
            <Text letterSpacing="wide" fontWeight="light">
              {appointment.user.name}
            </Text>
          </Flex>

          <Separator
            h="5"
            orientation="vertical"
            borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
          />

          <Badge
            colorPalette={getBadgeAppointmentColor[appointment.status]}
            w="fit-content"
          >
            {appointmentStatusLabel[appointment.status]}
          </Badge>
        </HStack>
      </Card.Body>
      <Card.Footer p="0" w="full" mt="2">
        <DialogEditAppointment appointment={appointment} />
        <DialogUpdateStatusAppointment appointment={appointment} />
      </Card.Footer>
    </Card.Root>
  )
}

export default CardAppointment
