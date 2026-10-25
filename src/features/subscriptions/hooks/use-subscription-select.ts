import { createListCollection } from '@chakra-ui/react'

import type { SubscriptionSelectItem } from '../types/subscription-select.type'

export function useSubscriptionSelect(
  selectItems: SubscriptionSelectItem[],
  onSelectionChange: (selectedValue: string) => void,
) {
  const selectCollection = createListCollection({ items: selectItems })
  const handleSelectValueChange = (selectedValues: string[]) => {
    if (selectedValues[0]) {
      onSelectionChange(selectedValues[0])
    }
  }

  return { selectCollection, handleSelectValueChange }
}
