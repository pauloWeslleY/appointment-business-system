import {
  Box,
  Flex,
  For,
  HStack,
  Portal,
  RadioCard,
  Select,
} from '@chakra-ui/react'

import SearchPage from '@/components/search-page'
import {
  contentCss,
  inputFieldStyles,
  menuItemCss,
} from '@/theme/styles/global-styles'

import { loadSelectStatusUpdateEstablishment } from '../constants/options-status-establishment'
import { useFilterTableEstablishment } from '../hooks/use-filter-table-establishment'
import type { EstablishmentStatusType } from '../types/establishment-status.type'

interface FilterTableEstablishmentProps {
  opening?: string
  status?: string
  startTransition: React.TransitionStartFunction
}

const FilterTableEstablishment = ({
  opening,
  status,
  startTransition,
}: FilterTableEstablishmentProps) => {
  const {
    filterSearchParamsTableEstablishment,
    mapColorOpeningEstablishment,
    clearStatusEstablishment,
    onChangeStatusEstablishment,
    onChangeOpeningEstablishment,
  } = useFilterTableEstablishment(startTransition, { opening, status })

  return (
    <Box spaceY="2">
      <Flex gap="2" align="center" flexWrap="wrap">
        <SearchPage w="min(350px, 100%)" />

        <Select.Root
          w="min(250px, 100%)"
          size="sm"
          variant="subtle"
          multiple
          collection={loadSelectStatusUpdateEstablishment}
          value={filterSearchParamsTableEstablishment.status}
          onValueChange={(details) =>
            onChangeStatusEstablishment(
              details.value as EstablishmentStatusType[],
            )
          }
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger {...inputFieldStyles}>
              <Select.ValueText placeholder="Selecione o status" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.ClearTrigger onClick={clearStatusEstablishment} />
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content css={contentCss}>
                {loadSelectStatusUpdateEstablishment.items.map((status) => (
                  <Select.Item
                    item={status}
                    key={status.value}
                    {...menuItemCss}
                  >
                    {status.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Flex>

      <RadioCard.Root
        size="sm"
        value={filterSearchParamsTableEstablishment.opening}
        onValueChange={(e) => onChangeOpeningEstablishment(e.value)}
        colorPalette={
          mapColorOpeningEstablishment[
            filterSearchParamsTableEstablishment.opening
          ]
        }
        variant="surface"
      >
        <Flex align="center" gap="4">
          <RadioCard.Label>Funcionamento: </RadioCard.Label>
          <HStack align="stretch">
            <For
              each={[
                { label: 'Todos', value: '' },
                { label: 'Aberto', value: 'true' },
                { label: 'Fechado', value: 'false' },
              ]}
            >
              {(item) => (
                <RadioCard.Item
                  key={item.value}
                  value={item.value}
                  borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
                  rounded="lg"
                >
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl display="flex" alignItems="center">
                    <RadioCard.ItemText>{item.label}</RadioCard.ItemText>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              )}
            </For>
          </HStack>
        </Flex>
      </RadioCard.Root>
    </Box>
  )
}

export default FilterTableEstablishment
