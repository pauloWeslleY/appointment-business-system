import { Flex, Portal, Select } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import SearchPage from '@/components/search-page'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import {
  contentCss,
  inputFieldStyles,
  menuItemCss,
} from '@/theme/styles/global-styles'

import {
  loadCollectionPageSizesTaxInformation,
  loadCollectionStatusTaxInformation,
  useFilterTableTaxInformation,
} from '../hooks/use-filter-table-tax-information'

const FilterTableTaxInformation = ({ children }: { children?: ReactNode }) => {
  const {
    filterTaxInformation,
    onChangeLimitTaxInformation,
    onChangeStatusTaxInformation,
    clearSelectTaxInformation,
  } = useFilterTableTaxInformation()

  return (
    <Flex align="center" gap="2" flexWrap="wrap">
      <SearchPage />

      <Select.Root
        colorPalette={colorDefaultTheme}
        variant="subtle"
        size="sm"
        collection={loadCollectionPageSizesTaxInformation}
        w={{ base: 'full', md: '250px' }}
        minW="0"
        maxW="full"
        value={[filterTaxInformation.limit.toString()]}
        onValueChange={(e) => onChangeLimitTaxInformation(e.value)}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger {...inputFieldStyles}>
            <Select.ValueText placeholder="Itens por página" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger
              onClick={() => clearSelectTaxInformation('limit')}
            />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content css={contentCss}>
              {loadCollectionPageSizesTaxInformation.items.map((pageSize) => (
                <Select.Item
                  key={pageSize.value}
                  item={pageSize}
                  {...menuItemCss}
                >
                  <Select.ItemText>{pageSize.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Select.Root
        colorPalette={colorDefaultTheme}
        variant="subtle"
        size="sm"
        collection={loadCollectionStatusTaxInformation}
        w={{ base: 'full', md: '250px' }}
        minW="0"
        maxW="full"
        value={filterTaxInformation.status.map(String)}
        onValueChange={(e) => onChangeStatusTaxInformation(e.value)}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger {...inputFieldStyles}>
            <Select.ValueText placeholder="Status" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger
              onClick={() => clearSelectTaxInformation('status')}
            />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content css={contentCss}>
              {loadCollectionStatusTaxInformation.items.map((pageSize) => (
                <Select.Item
                  key={pageSize.value}
                  item={pageSize}
                  {...menuItemCss}
                >
                  <Select.ItemText>{pageSize.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      {children}
    </Flex>
  )
}

export default FilterTableTaxInformation
