import { HStack, RadioGroup } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { useQueryState } from 'nuqs'

const items = [
  { label: 'Masculino', value: 'male' },
  { label: 'Feminino', value: 'female' },
  { label: 'Outro', value: 'other' },
  { label: 'Todos', value: null },
]

const FilterCustomerSex = () => {
  const [customerSex, setCustomerSex] = useQueryState('sex')
  const search = useSearch({
    from: '/dashboard/$establishmentId/customers/',
  })

  const onChangeCustomerSex = (sex: string | null) => {
    setCustomerSex(sex || null)
  }

  return (
    <RadioGroup.Root
      colorPalette="primary"
      mt="4"
      pl="2"
      value={(customerSex ?? search.sex) || ''}
      onValueChange={(e) => onChangeCustomerSex(e.value)}
    >
      <HStack gap="6">
        {items.map((item) => (
          <RadioGroup.Item key={item.value} value={item.value ?? ''}>
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
