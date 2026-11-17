import {
  Button,
  ButtonGroup,
  DatePicker,
  For,
  Icon,
  Popover,
  Stack,
} from '@chakra-ui/react'
import { Calendar } from 'lucide-react'

import { contentCss, inputFieldStyles } from '@/theme/styles/global-styles'

import { useFilterDatePicker } from './use-filter-date-picker'

interface FilterDatePickerProps {
  from?: string
  to?: string
  resetPagination?: boolean
}

const FilterDatePicker = ({
  from: initialFrom,
  to: initialTo,
  resetPagination = false,
}: FilterDatePickerProps) => {
  const {
    dateValue,
    displayedDate,
    filterDateThisWeek,
    filterDateNextWeek,
    filterDateNextSevenDays,
    filterDateNextThirtyDays,
    filterDateNextMonth,
    filterDateCurrentMonth,
    dateResetFilterPicker,
    handleSelectDateFilter,
    onChangeInputCalendar,
  } = useFilterDatePicker(initialFrom, initialTo, resetPagination)

  return (
    <Popover.Root positioning={{ placement: 'bottom-start' }}>
      <Popover.Trigger asChild>
        <Button
          size="sm"
          maxW="full"
          whiteSpace="normal"
          rounded={inputFieldStyles.rounded}
          bg={inputFieldStyles.bg}
          transition="backgrounds"
          color={{ _light: 'gray.700', _dark: 'gray.100' }}
          _hover={{
            bg: { _light: 'blackAlpha.200', _dark: 'gray.950/60' },
          }}
        >
          <Icon as={Calendar} boxSize="4" />
          {displayedDate}
        </Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content
          w="auto"
          css={{
            ...contentCss,
            '& [data-part="arrow-tip"]': {
              background: 'white !important',
              borderColor: 'gray.200',
              _dark: {
                background: 'secondary.700 !important',
                borderColor: 'secondary.500/20',
              },
            },
          }}
        >
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>

          <Popover.Body
            maxW="calc(100vw - 2rem)"
            maxH="calc(100dvh - 2rem)"
            overflow="auto"
            display="flex"
            flexDirection={{ base: 'column', md: 'row-reverse' }}
            gap="2"
          >
            <DatePicker.Root
              selectionMode="range"
              inline
              w="fit"
              value={dateValue}
              onValueChange={onChangeInputCalendar}
              locale="pt-br"
            >
              <DatePicker.Content unstyled>
                <DatePicker.View view="day">
                  <DatePicker.Header />
                  <DatePicker.DayTable />
                </DatePicker.View>
                <DatePicker.View view="month">
                  <DatePicker.Header />
                  <DatePicker.MonthTable />
                </DatePicker.View>
                <DatePicker.View view="year">
                  <DatePicker.Header />
                  <DatePicker.YearTable />
                </DatePicker.View>
              </DatePicker.Content>
            </DatePicker.Root>

            <Stack w="fit">
              <ButtonGroup
                variant="surface"
                colorPalette="secondary"
                size="xs"
                flexDir="column"
                flex="1"
              >
                <For
                  each={[
                    {
                      label: 'Esta semana',
                      value: filterDateThisWeek,
                    },
                    {
                      label: 'Este mês',
                      value: filterDateCurrentMonth,
                    },
                    {
                      label: 'Próxima semana',
                      value: filterDateNextWeek,
                    },
                    {
                      label: 'Próximos 7 dias',
                      value: filterDateNextSevenDays,
                    },
                    {
                      label: 'Próximos 30 dias',
                      value: filterDateNextThirtyDays,
                    },
                    {
                      label: 'Próximo mês',
                      value: filterDateNextMonth,
                    },
                  ]}
                >
                  {({ label, value }) => (
                    <Button
                      w="full"
                      rounded="lg"
                      onClick={() => handleSelectDateFilter(value)}
                    >
                      {label}
                    </Button>
                  )}
                </For>
              </ButtonGroup>

              <Popover.CloseTrigger asChild>
                <Button
                  size="sm"
                  colorPalette="primary"
                  variant="ghost"
                  rounded="lg"
                  onClick={() => handleSelectDateFilter(dateResetFilterPicker)}
                >
                  Resetar
                </Button>
              </Popover.CloseTrigger>
            </Stack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export default FilterDatePicker
