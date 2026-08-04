import { HStack, RadioGroup } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsString, useQueryState } from 'nuqs'

const items = [
  { label: 'Masculino', value: 'male' },
  { label: 'Feminino', value: 'female' },
  { label: 'Outro', value: 'other' },
  { label: 'Todos', value: '' },
]

const FilterCustomerSex = () => {
  const search = useSearch({
    from: '/dashboard/$establishmentId/customers/',
  })

  const [customerSex, setCustomerSex] = useQueryState(
    'sex',
    parseAsString.withDefault(search.sex ?? ''),
  )

  const onChangeCustomerSex = (sex: string | null) => {
    setCustomerSex(sex)
  }

  return (
    <RadioGroup.Root
      colorPalette="primary"
      mt="4"
      pl="2"
      value={customerSex}
      onValueChange={(e) => onChangeCustomerSex(e.value)}
    >
      <HStack gap="6">
        {items.map((item) => (
          <RadioGroup.Item key={item.value} value={item.value}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </HStack>
    </RadioGroup.Root>
  )
}

export default FilterCustomerSex
