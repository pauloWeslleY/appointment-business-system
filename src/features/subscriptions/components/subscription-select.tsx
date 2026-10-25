import { Portal, Select } from '@chakra-ui/react'

import { colorDefaultTheme } from '@/shared/constants/color-default-theme'
import {
  contentCss,
  inputStyles,
  menuItemCss,
} from '@/theme/styles/global-styles'

import { useSubscriptionSelect } from '../hooks/use-subscription-select'
import type { SubscriptionSelectProps } from '../types/subscription-select.type'

export function SubscriptionSelect({
  id,
  label,
  value,
  items,
  disabled,
  onChange,
}: SubscriptionSelectProps) {
  const { selectCollection, handleSelectValueChange } = useSubscriptionSelect(
    items,
    onChange,
  )

  return (
    <Select.Root
      maxW="400px"
      ids={{ trigger: id }}
      collection={selectCollection}
      value={value ? [value] : []}
      disabled={disabled}
      colorPalette={colorDefaultTheme}
      onValueChange={({ value }) => handleSelectValueChange(value)}
    >
      <Select.Label>{label}</Select.Label>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger css={inputStyles}>
          <Select.ValueText placeholder="Selecione uma organização" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content css={contentCss}>
            {selectCollection.items.map((item) => (
              <Select.Item key={item.value} item={item} css={menuItemCss}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
