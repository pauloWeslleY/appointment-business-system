import { createListCollection, Portal, Select } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsString, useQueryState } from 'nuqs'

import { contentCss } from '@/theme/styles/global-styles'

import {
  mapLabelStatusCollaborator,
  StatusCollaborator,
} from '../types/status-collaborator.type'

const loadSelectStatusCollaborator = createListCollection({
  items: Object.entries(StatusCollaborator).map(([, value]) => ({
    value: value,
    label: mapLabelStatusCollaborator(value),
  })),
})

const FilterSelectStatusCollaborator = () => {
  const search = useSearch({
    from: '/dashboard/$establishmentId/collaborators/',
  })

  const [statusCollaborator, setStatusCollaborator] = useQueryState(
    'status',
    parseAsString.withDefault(search.status ?? ''),
  )

  const onChangeStatusCollaborator = (status: string[]) => {
    const statusSelected = status[0]
    if (statusSelected === undefined) {
      setStatusCollaborator(null)
      return
    }

    setStatusCollaborator(statusSelected)
  }

  return (
    <Select.Root
      variant="subtle"
      size="sm"
      collection={loadSelectStatusCollaborator}
      w="250px"
      value={[statusCollaborator.toString()]}
      onValueChange={(e) => onChangeStatusCollaborator(e.value)}
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
          <Select.ClearTrigger onClick={() => setStatusCollaborator(null)} />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content css={contentCss}>
            {loadSelectStatusCollaborator.items.map((status) => (
              <Select.Item
                item={status}
                key={status.value}
                rounded="xl"
                cursor="pointer"
                _hover={{ bg: { base: 'gray.100', _dark: 'secondary.600' } }}
              >
                {status.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default FilterSelectStatusCollaborator
