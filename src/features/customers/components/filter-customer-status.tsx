import { createListCollection, Portal, Select } from '@chakra-ui/react'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

import { contentCss, inputFieldStyles } from '@/theme/styles/global-styles'

const loadCollectionStatusActives = createListCollection({
  items: [
    { label: 'Ativo', value: 'active' },
    { label: 'Inativo', value: 'inactive' },
  ],
})

const FilterCustomerStatus = () => {
  const [{ status }, setStatus] = useQueryStates(
    {
      status: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
    },
    { shallow: true },
  )

  const onChangeStatus = (status: string[]) =>
    setStatus({ status: status[0] ?? null, page: 1 })

  return (
    <Select.Root
      variant="subtle"
      size="sm"
      collection={loadCollectionStatusActives}
      w={{ base: 'full', md: '250px' }}
      minW="0"
      maxW="full"
      value={[status]}
      onValueChange={(e) => onChangeStatus(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger {...inputFieldStyles}>
          <Select.ValueText placeholder="Selecione o status" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger
            onClick={() => setStatus({ status: null, page: 1 })}
          />
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
