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
import dayjs from 'dayjs'
import React from 'react'

import { contentCss } from '@/theme/styles/global-styles'

import { getBadgeBookingColor } from '../constants/get-badge-booking-color'
import { bookingStatusLabel } from '../types/booking-status.type'
import type { GetBookingByEstablishmentModel } from '../types/get-booking-by-establishment.model'

interface DialogInfoBookingProps {
  booking: GetBookingByEstablishmentModel
  open: boolean
  onOpen: (open: boolean) => void
}

const DialogInfoBooking = ({
  booking,
  open,
  onOpen,
}: DialogInfoBookingProps) => {
  const formatBookingDate = dayjs(booking.date)

  const loadBookingInfo = [
    { label: 'Nome do cliente', value: booking.user.name },
    { label: 'Status', value: booking.status },
    { label: 'Data', value: formatBookingDate.format('DD/MM/YYYY') },
    { label: 'Horário', value: formatBookingDate.format('HH:mm') },
    { label: 'Observações', value: booking.notes ?? 'Nenhuma observação' },
  ]

  return (
    <Dialog.Root
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
                <For each={loadBookingInfo}>
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
                              <Avatar.Root size="xs">
                                {booking.user.image && (
                                  <Avatar.Image src={booking.user.image} />
                                )}
                                <Avatar.Fallback />
                              </Avatar.Root>
                              {booking.user.name}
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
                                getBadgeBookingColor[booking.status]
                              }
                              w="fit-content"
                            >
                              {bookingStatusLabel[booking.status]}
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
export default DialogInfoBooking
