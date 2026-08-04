import { Badge, Box, For, HStack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React from 'react'

import { getBadgeBookingColor } from '../constants/get-badge-booking-color'
import { bookingStatusLabel } from '../types/booking-status.type'
import type { GetBookingByEstablishmentModel } from '../types/get-booking-by-establishment.model'

interface DialogEditBookingInfoProps {
  booking: GetBookingByEstablishmentModel
}

const DialogEditBookingInfo = ({ booking }: DialogEditBookingInfoProps) => {
  const bookingDateCurrent = dayjs(booking.date)

  const BookingInfo: { title: string; content: React.ReactNode }[] = [
    {
      title: 'Status:',
      content: (
        <Badge colorPalette={getBadgeBookingColor[booking.status]} w="fit">
          {bookingStatusLabel[booking.status]}
        </Badge>
      ),
    },
    { title: 'Data:', content: bookingDateCurrent.format('DD/MM/YYYY') },
    { title: 'Horário:', content: bookingDateCurrent.format('HH:mm') },
  ]

  return (
    <Box spaceY="1" mb="4">
      <For each={BookingInfo}>
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

export default DialogEditBookingInfo
