import { createListCollection, Portal, Select } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsString, useQueryState } from 'nuqs'

import { contentCss } from '@/theme/styles/global-styles'

const loadCollectionStatusActives = createListCollection({
  items: [
    { label: 'Ativo', value: 'active' },
    { label: 'Inativo', value: 'inactive' },
  ],
})

const FilterCustomerStatus = () => {
  const search = useSearch({
    from: '/dashboard/$establishmentId/customers/',
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
      collection={loadCollectionStatusActives}
      w="250px"
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
            {loadCollectionStatusActives.items.map((status) => (
              <Select.Item
                key={status.value}
                item={status}
                rounded="xl"
                cursor="pointer"
                _hover={{
                  bg: { base: 'gray.100', _dark: 'secondary.600' },
                }}
              >
                <Select.ItemText>{status.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default FilterCustomerStatus
