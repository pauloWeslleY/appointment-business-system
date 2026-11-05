import {
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  Fieldset,
  Flex,
  For,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Plus, Trash2 } from 'lucide-react'
import {
  Controller,
  useFieldArray,
  type UseFormReturn,
  useWatch,
} from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { Tooltip } from '@/components/ui/tooltip'
import {
  createListWeekDays,
  weekDaysLabels,
} from '@/shared/utils/create-list-weekdays'

import type {
  ProfessionalFormData,
  ProfessionalFormInput,
} from '../types/professional-form.type'

const MAX_WORK_SCHEDULE_PERIODS = 84

const DEFAULT_WORK_PERIOD = { startsAt: '08:00', endsAt: '18:00' }

const EMPTY_WORK_PERIOD = { startsAt: '', endsAt: '' }

interface ProfessionalWorkScheduleFieldsProps {
  form: UseFormReturn<ProfessionalFormInput, unknown, ProfessionalFormData>
}

const ProfessionalWorkScheduleFields = ({
  form,
}: ProfessionalWorkScheduleFieldsProps) => {
  const { errors } = form.formState

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'workSchedule',
  })

  const workSchedule =
    useWatch({ control: form.control, name: 'workSchedule' }) ?? []

  const selectedDays = [
    ...new Set(workSchedule.map((period) => String(period.dayOfWeek))),
  ]

  const hasReachedPeriodsLimit = fields.length >= MAX_WORK_SCHEDULE_PERIODS

  const onChangeSelectedDays = (days: string[]) => {
    const addedDays = days.filter((day) => !selectedDays.includes(day))
    const removedDays = selectedDays.filter((day) => !days.includes(day))

    const removedPeriodIndexes = fields.flatMap((field, index) =>
      removedDays.includes(String(field.dayOfWeek)) ? [index] : [],
    )

    remove(removedPeriodIndexes)

    for (const day of addedDays) {
      append({ dayOfWeek: Number(day), ...DEFAULT_WORK_PERIOD })
    }
  }

  const addPeriodToDay = (dayOfWeek: number) => {
    append({ dayOfWeek, ...EMPTY_WORK_PERIOD })
  }

  return (
    <Stack aria-label="Horário de trabalho" gap="4">
      <Fieldset.Root>
        <Fieldset.Legend fontSize="sm">
          Selecione os dias de trabalho do profissional
        </Fieldset.Legend>

        <CheckboxGroup
          name="workScheduleDays"
          value={selectedDays}
          onValueChange={onChangeSelectedDays}
        >
          <Fieldset.Content
            display="flex"
            flexDir="row"
            flexWrap="wrap"
            gap="3"
          >
            <For each={createListWeekDays()}>
              {(day) => (
                <Checkbox.Root key={day.value} value={day.value}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control rounded="md" />
                  <Checkbox.Label>{day.label}</Checkbox.Label>
                </Checkbox.Root>
              )}
            </For>
          </Fieldset.Content>
        </CheckboxGroup>
      </Fieldset.Root>

      <Stack
        gap="4"
        p="4"
        borderWidth="1px"
        rounded="lg"
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
        shadow={{ base: 'shape', md: '2xs' }}
      >
        <Text fontWeight="medium">Horário de trabalho</Text>

        {fields.length === 0 && (
          <Text fontSize="sm" color="fg.muted">
            Nenhum dia selecionado.
          </Text>
        )}

        <For each={createListWeekDays()}>
          {(day) => {
            const dayOfWeek = Number(day.value)
            const dayPeriods = fields.flatMap((field, index) =>
              field.dayOfWeek === dayOfWeek ? [{ field, index }] : [],
            )

            if (dayPeriods.length === 0) {
              return null
            }

            return (
              <Flex
                key={day.value}
                gap="3"
                flexDir={{ base: 'column', md: 'row' }}
                align={{ base: 'stretch', md: 'flex-start' }}
              >
                <Text
                  fontSize="sm"
                  w={{ md: '20' }}
                  pt={{ md: '2' }}
                  color={{ base: 'secondary.600', _dark: 'secondary.400' }}
                >
                  {weekDaysLabels[dayOfWeek]}
                </Text>

                <Stack gap="2" flex="1">
                  {dayPeriods.map(({ field, index }) => (
                    <HStack key={field.id} gap="2" align="flex-start">
                      <Controller
                        name={`workSchedule.${index}.startsAt`}
                        control={form.control}
                        render={({ field: startsAtField }) => (
                          <Field
                            invalid={!!errors.workSchedule?.[index]?.startsAt}
                            errorText={
                              errors.workSchedule?.[index]?.startsAt?.message
                            }
                          >
                            <PatternFormat
                              value={startsAtField.value}
                              onValueChange={(values) =>
                                startsAtField.onChange(values.formattedValue)
                              }
                              format="##:##"
                              placeholder="00:00"
                              mask="_"
                              aria-label={`Início em ${weekDaysLabels[dayOfWeek]}`}
                              customInput={InputField}
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name={`workSchedule.${index}.endsAt`}
                        control={form.control}
                        render={({ field: endsAtField }) => (
                          <Field
                            invalid={!!errors.workSchedule?.[index]?.endsAt}
                            errorText={
                              errors.workSchedule?.[index]?.endsAt?.message
                            }
                          >
                            <PatternFormat
                              value={endsAtField.value}
                              onValueChange={(values) =>
                                endsAtField.onChange(values.formattedValue)
                              }
                              format="##:##"
                              placeholder="00:00"
                              mask="_"
                              aria-label={`Fim em ${weekDaysLabels[dayOfWeek]}`}
                              customInput={InputField}
                            />
                          </Field>
                        )}
                      />

                      <Tooltip content="Remover horário" showArrow>
                        <IconButton
                          size="xs"
                          rounded="full"
                          variant="ghost"
                          colorPalette="red"
                          mt="1"
                          aria-label={`Remover horário de ${weekDaysLabels[dayOfWeek]}`}
                          onClick={() => remove(index)}
                        >
                          <Icon as={Trash2} boxSize="4" />
                        </IconButton>
                      </Tooltip>
                    </HStack>
                  ))}

                  <Button
                    type="button"
                    size="xs"
                    rounded="lg"
                    variant="ghost"
                    colorPalette="green"
                    alignSelf="start"
                    disabled={hasReachedPeriodsLimit}
                    onClick={() => addPeriodToDay(dayOfWeek)}
                  >
                    <Icon as={Plus} boxSize="4" />
                    Adicionar horário
                  </Button>
                </Stack>
              </Flex>
            )
          }}
        </For>

        {errors.workSchedule?.message && (
          <Alert.Root status="error" variant="surface" rounded="lg">
            <Alert.Indicator />
            <Alert.Title>{errors.workSchedule.message}</Alert.Title>
          </Alert.Root>
        )}
      </Stack>
    </Stack>
  )
}

export default ProfessionalWorkScheduleFields
