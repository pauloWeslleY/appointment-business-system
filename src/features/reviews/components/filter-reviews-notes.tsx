import {
  createListCollection,
  HStack,
  Portal,
  Select,
  Text,
} from '@chakra-ui/react'
import { Star } from 'lucide-react'
import { parseAsInteger, useQueryStates } from 'nuqs'

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
  const [{ notes }, setSearch] = useQueryStates(
    {
      notes: parseAsInteger.withDefault(0),
      page: parseAsInteger.withDefault(1),
    },
    { shallow: true },
  )
  const setNotes = (value: number | null) =>
    setSearch({ notes: value, page: 1 })

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
      w={{ base: 'full', md: '250px' }}
      minW="0"
      maxW="full"
      value={[notes.toString()]}
      onValueChange={(e) => onChangeNotes(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          rounded="xl"
          bg={{ base: 'blackAlpha.100', _dark: 'gray.800/40' }}
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
