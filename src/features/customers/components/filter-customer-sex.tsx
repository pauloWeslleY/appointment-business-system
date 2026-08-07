import { createListCollection, Portal, Select } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { useQueryState } from 'nuqs'

import { contentCss } from '@/theme/styles/global-styles'

const selectMaxCustomers = createListCollection({
  items: [
    { label: 'Masculino', value: 'male' },
    { label: 'Feminino', value: 'female' },
    { label: 'Outro', value: 'other' },
  ],
})

const FilterCustomerSex = () => {
  const [customerSex, setCustomerSex] = useQueryState('sex')
  const search = useSearch({
    from: '/dashboard/$establishmentId/customers/',
  })

  const onChangeCustomerSex = (sex: string | null) => {
    setCustomerSex(sex || null)
  }

  return (
    <Select.Root
      variant="subtle"
      size="sm"
      collection={selectMaxCustomers}
      w="250px"
      value={[customerSex ?? search.sex ?? '']}
      onValueChange={(e) => onChangeCustomerSex(e.value[0])}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          rounded="xl"
          bg={{ base: 'blackAlpha.100', _dark: 'gray.800/40' }}
        >
          <Select.ValueText placeholder="Selecione o sexo" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger onClick={() => setCustomerSex(null)} />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content css={contentCss}>
            {selectMaxCustomers.items.map((status) => (
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

export default FilterCustomerSex
