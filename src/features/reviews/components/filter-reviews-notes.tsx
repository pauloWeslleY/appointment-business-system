import {
  createListCollection,
  HStack,
  Portal,
  Select,
  Text,
} from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { Star } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'

import { contentCss } from '@/theme/styles/global-styles'

const reviewsNotes = () => {
  const notes = []
  for (let i = 1; i <= 5; i++) {
    notes.push({
      label: `${i} estrela${i > 1 ? 's' : ''}`,
      value: i.toString(),
      rating: i,
    })
  }
  return notes
}

const loadSelectRatings = createListCollection({
  items: reviewsNotes(),
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
      collection={loadSelectRatings}
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
          <Select.ValueText placeholder="Selecione uma avaliação" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger onClick={() => setNotes(null)} />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content css={contentCss}>
            {loadSelectRatings.items.map((rating) => (
              <Select.Item
                item={rating}
                key={rating.value}
                rounded="xl"
                cursor="pointer"
                _hover={{ bg: { base: 'gray.100', _dark: 'secondary.600' } }}
              >
                <HStack gap="1">
                  <Text>Avaliação:</Text>

                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill={
                        index < parseInt(rating.value, 10)
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  ))}
                </HStack>
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
