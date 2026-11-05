import { Badge, Box, For, HStack, Text } from '@chakra-ui/react'
import React from 'react'

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import type { AppointmentModel } from '../types/appointment.model'
import { appointmentStatusLabel } from '../types/appointment-status.type'
import { appointmentLocalDate } from '../utils/appointment-date'

interface DialogEditAppointmentInfoProps {
  appointment: AppointmentModel
}

const DialogEditAppointmentInfo = ({
  appointment,
}: DialogEditAppointmentInfoProps) => {
  const appointmentDateCurrent = appointmentLocalDate(
    appointment.startsAt,
    appointment.timezone,
  )

  const AppointmentInfo: { title: string; content: React.ReactNode }[] = [
    {
      title: 'Status:',
      content: (
        <Badge
          colorPalette={getBadgeAppointmentColor[appointment.status]}
          w="fit"
        >
          {appointmentStatusLabel[appointment.status]}
        </Badge>
      ),
    },
    { title: 'Data:', content: appointmentDateCurrent.format('DD/MM/YYYY') },
    {
      title: 'Horário:',
      content: appointmentDateCurrent.format('HH:mm [UTC]Z'),
    },
  ]

  return (
    <Box spaceY="1" mb="4">
      <For each={AppointmentInfo}>
        {(info) => (
          <React.Fragment key={info.title}>
            {info.title === 'Status:' ? (
              <HStack align="center">
                <Text
                  fontSize="sm"
                  color={{ base: 'gray.600', _dark: 'gray.400' }}
                >
                  {info.title}:
                </Text>
                {info.content}
              </HStack>
            ) : (
              <Text
                fontSize="sm"
                color={{ base: 'gray.600', _dark: 'gray.400' }}
              >
                {info.title} {info.content}
              </Text>
            )}
          </React.Fragment>
        )}
      </For>
    </Box>
  )
}

export default DialogEditAppointmentInfo
