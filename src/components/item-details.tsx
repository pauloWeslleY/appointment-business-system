import { chakra, defineRecipe } from '@chakra-ui/react'

const baseItemDetailsRoot = defineRecipe({
  className: 'item-details-root',
  base: {
    display: 'flex',
    minW: '0',
    flexWrap: 'wrap',
    gap: '1',
  },
  variants: {
    direction: {
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      column: {
        flexDirection: 'column',
      },
    },
  },
})

const baseItemDetailsLabel = defineRecipe({
  className: 'item-details-label',
  base: {
    display: 'flex',
    gap: '1',
    alignItems: 'center',
    color: 'fg.muted',
    fontSize: 'sm',
  },
})

const baseItemDetailsValue = defineRecipe({
  className: 'item-details-value',
  base: {
    display: 'flex',
    minWidth: '0',
    overflowWrap: 'anywhere',
    flex: '1',
  },
})

export const ItemDetails = {
  Root: chakra('div', baseItemDetailsRoot),
  Label: chakra('dt', baseItemDetailsLabel),
  Value: chakra('dd', baseItemDetailsValue),
}
