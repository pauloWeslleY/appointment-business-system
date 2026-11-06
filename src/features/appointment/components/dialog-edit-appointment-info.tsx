import { Badge, DataList, For } from '@chakra-ui/react'
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
  const appointmentStatusColor = getBadgeAppointmentColor[appointment.status]
  const appointmentStatusLabelText = appointmentStatusLabel[appointment.status]

  return (
    <DataList.Root mb="4" orientation="horizontal">
      <For
        each={[
          {
            title: 'Status:',
            content: appointmentStatusLabelText,
          },
          {
            title: 'Data:',
            content: appointmentDateCurrent.format('DD/MM/YYYY'),
          },
          {
            title: 'Horário:',
            content: appointmentDateCurrent.format('HH:mm'),
          },
        ]}
      >
        {(data) => (
          <DataList.Item key={data.title}>
            <DataList.ItemLabel>{data.title}</DataList.ItemLabel>
            {data.title === 'Status:' ? (
              <DataList.ItemLabel>
                <Badge
                  colorPalette={appointmentStatusColor}
                  w="fit"
                  variant="surface"
                >
                  {data.content}
                </Badge>
              </DataList.ItemLabel>
            ) : (
              <DataList.ItemLabel>{data.content}</DataList.ItemLabel>
            )}
          </DataList.Item>
        )}
      </For>
    </DataList.Root>
  )
}

export default DialogEditAppointmentInfo
