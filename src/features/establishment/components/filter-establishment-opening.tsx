import { createListCollection, Portal, Select } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsString, useQueryState } from 'nuqs'

import { contentCss } from '@/theme/styles/global-styles'

const loadSelectOpeningStatus = createListCollection({
  items: [
    { label: 'Aberto', value: 'true' },
    { label: 'Fechado', value: 'false' },
  ],
})

const FilterEstablishmentOpening = () => {
  const search = useSearch({
    from: '/_app/_authenticated/_admin/establishment/',
  })
  const [opening, setOpening] = useQueryState(
    'opening',
    parseAsString.withDefault(search.opening?.toString() ?? ''),
  )

  const onChangeOpening = (values: string[]) => setOpening(values[0])

  return (
    <Select.Root
      variant="subtle"
      size="sm"
      collection={loadSelectOpeningStatus}
      w={{ base: 'full', md: '250px' }}
      minW="0"
      maxW="full"
      value={[opening]}
      onValueChange={(e) => onChangeOpening(e.value)}
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
          <Select.ClearTrigger onClick={() => setOpening(null)} />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content css={contentCss}>
            {loadSelectOpeningStatus.items.map((openingStatus) => (
              <Select.Item
                key={openingStatus.value}
                item={openingStatus}
                rounded="xl"
                cursor="pointer"
                _hover={{
                  bg: { base: 'gray.100', _dark: 'secondary.600' },
                }}
              >
                <Select.ItemText>{openingStatus.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default FilterEstablishmentOpening
