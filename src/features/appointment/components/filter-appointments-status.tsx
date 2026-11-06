import { Portal, Select } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsString, useQueryState } from 'nuqs'

import { contentCss } from '@/theme/styles/global-styles'

import { loadCollectionStatusAppointment } from '../utils/select-appointment'

const FilterAppointmentsStatus = () => {
  const search = useSearch({
    from: '/_app/_authenticated/dashboard/$slug/appointment/',
  })
  const [status, setStatus] = useQueryState(
    'status',
    parseAsString.withDefault(search.status ?? ''),
  )

  const onChangeStatus = (status: string[]) => setStatus(status[0])

  return (
    <Select.Root
      variant="subtle"
      size="sm"
      collection={loadCollectionStatusAppointment}
      w={{ base: 'full', md: '250px' }}
      minW="0"
      maxW="full"
      value={[status]}
      onValueChange={(e) => onChangeStatus(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          rounded="xl"
          bg={{ base: 'blackAlpha.100', _dark: 'gray.800/40' }}
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
          <Select.Content css={contentCss}>
            {loadCollectionStatusAppointment.items.map((appointmentStatus) => (
              <Select.Item
                key={appointmentStatus.value}
                item={appointmentStatus}
                rounded="xl"
                cursor="pointer"
                _hover={{
                  bg: { base: 'gray.100', _dark: 'secondary.600' },
                }}
              >
                <Select.ItemText>{appointmentStatus.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default FilterAppointmentsStatus
