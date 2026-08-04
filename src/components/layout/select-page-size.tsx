import { createListCollection, Portal, Select } from '@chakra-ui/react'
import { parseAsInteger, useQueryStates } from 'nuqs'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { contentCss } from '@/theme/styles/global-styles'

interface SelectPageSizeProps {
  pages: number[]
  search?: {
    page: number
    pageSize: number
  }
}

const SelectPageSize = ({ pages, search }: SelectPageSizeProps) => {
  const loadCollectionStatusBooking = createListCollection({
    items: pages.map((page) => ({
      value: page.toString(),
      label: page.toString(),
    })),
  })

  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(search?.page ?? 1),
      page_size: parseAsInteger.withDefault(search?.pageSize ?? 12),
    },
    {
      shallow: false,
    },
  )

  const onChangePagination = (status: string[]) => {
    setPagination({
      page: search?.page ?? 1,
      page_size: Number(status[0] ?? 12),
    })
  }

  const clearPagination = () => {
    setPagination({ page: 1, page_size: 12 })
  }

  return (
    <Select.Root
      colorPalette={colorDefaultTheme}
      variant="outline"
      size="sm"
      collection={loadCollectionStatusBooking}
      w="250px"
      value={[pagination.page_size.toString()]}
      onValueChange={(e) => onChangePagination(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger rounded="xl">
          <Select.ValueText placeholder="Itens por página" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger onClick={clearPagination} />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content css={contentCss}>
            {loadCollectionStatusBooking.items.map((bookingStatus) => (
              <Select.Item
                key={bookingStatus.value}
                item={bookingStatus}
                rounded="xl"
                cursor="pointer"
                _hover={{
                  bg: { base: 'gray.100', _dark: 'secondary.600' },
                }}
              >
                <Select.ItemText>{bookingStatus.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default SelectPageSize
