import { createListCollection, Portal, Select } from '@chakra-ui/react'
import { parseAsInteger, useQueryStates } from 'nuqs'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import { contentCss, menuItemCss } from '@/theme/styles/global-styles'

interface SelectPageSizeProps {
  shallow?: boolean
  pages: number[]
  search?: {
    page: number
    pageSize: number
  }
}

const SelectPageSize = ({
  pages,
  search,
  shallow = false,
}: SelectPageSizeProps) => {
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsInteger.withDefault(search?.page ?? 1),
      page_size: parseAsInteger.withDefault(search?.pageSize ?? 12),
    },
    {
      shallow,
    },
  )

  const loadCollectionPage = createListCollection({
    items: pages.map((page) => ({
      value: page.toString(),
      label: page.toString(),
    })),
  })

  const onChangePagination = (status: string[]) => {
    setPagination({ page: 1, page_size: Number(status[0] ?? 12) })
  }

  const clearPagination = () => {
    setPagination({ page: 1, page_size: 12 })
  }

  return (
    <Select.Root
      colorPalette={colorDefaultTheme}
      variant="outline"
      size="sm"
      collection={loadCollectionPage}
      w={{ base: 'full', md: '250px' }}
      minW="0"
      maxW="full"
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
            {loadCollectionPage.items.map((page) => (
              <Select.Item key={page.value} item={page} {...menuItemCss}>
                <Select.ItemText>{page.label}</Select.ItemText>
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
