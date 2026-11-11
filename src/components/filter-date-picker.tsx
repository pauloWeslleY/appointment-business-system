import { Button, DatePicker, Icon, parseDate, Popover } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Calendar } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'

import { contentCss, inputFieldStyles } from '@/theme/styles/global-styles'

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
  const [{ from, to }, setDateSearch] = useQueryStates(
    {
      from: parseAsString.withDefault(initialFrom ?? ''),
      to: parseAsString.withDefault(initialTo ?? ''),
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: resetPagination,
    },
  )

  const queryDateValue = useMemo(() => {
    return [from, to]
      .filter((date): date is string => Boolean(date))
      .map((date) => parseDate(date))
  }, [from, to])

  const [dateValue, setDateValue] =
    useState<DatePicker.ValueChangeDetails['value']>(queryDateValue)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDateValue(queryDateValue)
  }, [queryDateValue])

  const displayedDate = useMemo(() => {
    const formatDate = (date: string) =>
      dayjs(date).locale('pt-br').format('DD MMM YYYY')

    if (from && to) {
      return `${formatDate(from)} - ${formatDate(to)}`
    }

    if (from) {
      return formatDate(from)
    }

    return 'Selecione um período'
  }, [from, to])

  const handleResetDate = () => {
    const dateCurrent = dayjs()
    setDateSearch({
      from: dateCurrent.format('YYYY-MM-DD'),
      to: dateCurrent.add(1, 'month').format('YYYY-MM-DD'),
      ...(resetPagination ? { page: 1 } : {}),
    })
  }

  const onChangeInputCalendar = (details: DatePicker.ValueChangeDetails) => {
    setDateValue(details.value)

    const dateFrom = details.value[0]?.toString()
    const dateTo = details.value[1]?.toString()

    if (!dateFrom || !dateTo) {
      return
    }

    setDateSearch({
      from: dateFrom,
      to: dateTo,
      ...(resetPagination ? { page: 1 } : {}),
    })
  }

  return (
    <Popover.Root positioning={{ placement: 'bottom-start' }}>
      <Popover.Trigger asChild>
        <Button
          size="sm"
          maxW="full"
          whiteSpace="normal"
          rounded="xl"
          bg={inputFieldStyles.bg}
          color={{ _light: 'gray.700', _dark: 'gray.100' }}
          transition="backgrounds"
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
          maxW="calc(100vw - 2rem)"
          maxH="calc(100dvh - 2rem)"
          overflow="auto"
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
          <Popover.Arrow />

          <Popover.Body>
            <DatePicker.Root
              selectionMode="range"
              inline
              width="full"
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

            <Popover.CloseTrigger asChild>
              <Button
                size="sm"
                colorPalette="primary"
                variant="ghost"
                rounded="lg"
                mt="2"
                w="full"
                onClick={handleResetDate}
              >
                Resetar
              </Button>
            </Popover.CloseTrigger>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export default FilterDatePicker
