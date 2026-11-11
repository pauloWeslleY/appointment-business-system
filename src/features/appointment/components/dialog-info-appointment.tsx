import {
  Avatar,
  Badge,
  CloseButton,
  DataList,
  Dialog,
  For,
  HStack,
  Portal,
} from '@chakra-ui/react'
import React from 'react'

import { contentCss } from '@/theme/styles/global-styles'

import { getBadgeAppointmentColor } from '../constants/get-badge-appointment-color'
import type { AppointmentModel } from '../types/appointment.model'
import { appointmentStatusLabel } from '../types/appointment-status.type'
import { appointmentLocalDate } from '../helpers/appointment-date'

interface DialogInfoAppointmentProps {
  appointment: AppointmentModel
  open: boolean
  onOpen: (open: boolean) => void
}

const DialogInfoAppointment = ({
  appointment,
  open,
  onOpen,
}: DialogInfoAppointmentProps) => {
  const formatAppointmentDate = appointmentLocalDate(
    appointment.startsAt,
    appointment.timezone,
  )

  const loadAppointmentInfo = [
    { label: 'Nome do cliente', value: appointment.customerNameSnapshot },
    { label: 'Status', value: appointment.status },
    { label: 'Data', value: formatAppointmentDate.format('DD/MM/YYYY') },
    { label: 'Horário', value: formatAppointmentDate.format('HH:mm') },
    { label: 'Observações', value: appointment.notes ?? 'Nenhuma observação' },
  ]

  return (
    <Dialog.Root
      size="md"
      motionPreset="slide-in-bottom"
      placement="center"
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Informações do agendamento</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="8">
              <DataList.Root orientation="horizontal">
                <For each={loadAppointmentInfo}>
                  {(item) => (
                    <React.Fragment key={item.label}>
                      {['Nome do cliente', 'Status'].includes(
                        item.label,
                      ) ? null : (
                        <DataList.Item>
                          <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                          <DataList.ItemValue>{item.value}</DataList.ItemValue>
                        </DataList.Item>
                      )}

                      {item.label === 'Nome do cliente' && (
                        <DataList.Item>
                          <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                          <DataList.ItemValue>
                            <HStack>
                              <Avatar.Root size="xs" colorPalette="primary">
                                <Avatar.Fallback />
                              </Avatar.Root>
                              {appointment.customerNameSnapshot}
                            </HStack>
                          </DataList.ItemValue>
                        </DataList.Item>
                      )}

                      {item.label === 'Status' && (
                        <DataList.Item>
                          <DataList.ItemLabel>Status</DataList.ItemLabel>
                          <DataList.ItemValue>
                            <Badge
                              colorPalette={
                                getBadgeAppointmentColor[appointment.status]
                              }
                              w="fit-content"
                            >
                              {appointmentStatusLabel[appointment.status]}
                            </Badge>
                          </DataList.ItemValue>
                        </DataList.Item>
                      )}
                    </React.Fragment>
                  )}
                </For>
              </DataList.Root>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DialogInfoAppointment
