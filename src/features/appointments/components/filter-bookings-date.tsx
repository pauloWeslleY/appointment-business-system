import { Button, DatePicker, Icon, parseDate, Popover } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { Calendar } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'

const FilterBookingsDate = () => {
  const search = useSearch({
    from: '/dashboard/$establishmentId/appointments/',
  })

  const [{ from, to }, setDateSearch] = useQueryStates(
    {
      from: parseAsString.withDefault(search.from ?? ''),
      to: parseAsString.withDefault(search.to ?? ''),
    },
    {
      shallow: false,
    },
  )

  const queryDateValue = useMemo(() => {
    return [from, to]
      .filter((date): date is string => Boolean(date))
      .map((date) => parseDate(date))
  }, [from, to])

  const [dateValue, setDateValue] =
    useState<DatePicker.ValueChangeDetails['value']>(queryDateValue)

  /*
   * TODO: Mantém o calendário sincronizado quando a URL mudar
   * por navegação externa, botão voltar etc.
   */
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
    })
  }

  const onChangeInputCalendar = (details: DatePicker.ValueChangeDetails) => {
    setDateValue(details.value)

    const dateFrom = details.value[0]?.toString()
    const dateTo = details.value[1]?.toString()

    // Não atualiza a URL enquanto o intervalo estiver incompleto
    if (!dateFrom || !dateTo) {
      return
    }

    setDateSearch({
      from: dateFrom,
      to: dateTo,
    })
  }

  return (
    <Popover.Root positioning={{ placement: 'left-start' }}>
      <Popover.Trigger asChild>
        <Button
          size="sm"
          rounded="xl"
          bg={{ base: 'blackAlpha.100', _dark: 'gray.950/40' }}
          color={{ base: 'gray.700', _dark: 'gray.100' }}
          transition="backgrounds"
          _hover={{
            bg: { base: 'blackAlpha.200', _dark: 'gray.950/60' },
          }}
        >
          <Icon as={Calendar} boxSize="4" />
          {displayedDate}
        </Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content
          w="auto"
          borderWidth="1px"
          borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
          rounded="lg"
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
                variant="outline"
                rounded="xl"
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

export default FilterBookingsDate
