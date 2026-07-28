import { createListCollection, Portal, Select } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { parseAsInteger, useQueryState } from 'nuqs'

const loadSelectReviewsNotes = createListCollection({
  items: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ],
})

const FilterReviewsNotes = () => {
  const search = useSearch({
    from: '/dashboard/$establishmentId/reviews/',
  })

  const [notes, setNotes] = useQueryState(
    'notes',
    parseAsInteger.withDefault(search.notes ?? 0),
  )

  const onChangeNotes = (notes: string[]) => {
    const noteSelected = notes[0]
    if (noteSelected === undefined) {
      setNotes(null)
      return
    }

    setNotes(parseInt(noteSelected, 10))
  }

  return (
    <Select.Root
      variant="subtle"
      size="sm"
      collection={loadSelectReviewsNotes}
      w="250px"
      value={[notes.toString()]}
      onValueChange={(e) => onChangeNotes(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          rounded="xl"
          bg={{ base: 'blackAlpha.100', _dark: 'gray.950/40' }}
        >
          <Select.ValueText placeholder="Selecione a nota" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger onClick={() => setNotes(null)} />
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
            {loadSelectReviewsNotes.items.map((framework) => (
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

export default FilterReviewsNotes
