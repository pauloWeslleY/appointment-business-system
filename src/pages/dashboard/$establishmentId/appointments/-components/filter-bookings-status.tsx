import { createListCollection, Portal, Select } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsString, useQueryState } from 'nuqs'

import { BookingStatus } from '@/shared/services/bookings/booking.dto'

const loadSelectStatusBookings = createListCollection({
  items: [
    { label: 'Confirmado', value: BookingStatus.CONFIRMED },
    { label: 'Cancelado', value: BookingStatus.CANCELLED },
    { label: 'Concluído', value: BookingStatus.COMPLETED },
  ],
})

const FilterBookingsStatus = () => {
  const search = useSearch({
    from: '/dashboard/$establishmentId/appointments/',
  })

  const [status, setStatus] = useQueryState(
    'status',
    parseAsString.withDefault(search.status ?? ''),
  )

  const onChangeStatus = (status: string[]) => {
    setStatus(status[0])
  }

  return (
    <Select.Root
      variant="subtle"
      size="sm"
      collection={loadSelectStatusBookings}
      w="250px"
      value={[status]}
      onValueChange={(e) => onChangeStatus(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          rounded="xl"
          bg={{ base: 'blackAlpha.100', _dark: 'gray.950/40' }}
        >
          <Select.ValueText placeholder="Selecione o status" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger onClick={() => setStatus(null)} />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content
            borderWidth="1px"
            borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            rounded="lg"
          >
            {loadSelectStatusBookings.items.map((framework) => (
              <Select.Item item={framework} key={framework.value} rounded="lg">
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default FilterBookingsStatus
