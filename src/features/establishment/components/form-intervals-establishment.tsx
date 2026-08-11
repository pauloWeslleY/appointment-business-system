import {
  Alert,
  Button,
  chakra,
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
import { Trash2 } from 'lucide-react'
import {
  type Control,
  Controller,
  type FieldErrors,
  useController,
  useFieldArray,
} from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { Tooltip } from '@/components/ui/tooltip'
import {
  createListWeekDays,
  weekDaysLabels,
} from '@/shared/utils/create-list-weekdays'

import type { EstablishmentFormData } from '../types/establishment-form-data.type'

interface FormIntervalEstablishmentProps {
  values: EstablishmentFormData
  control: Control<EstablishmentFormData>
  errors: FieldErrors<EstablishmentFormData>
  onCloseAlertInterval: () => void
}

const FormIntervalEstablishment = ({
  values,
  control,
  errors,
  onCloseAlertInterval,
}: FormIntervalEstablishmentProps) => {
  const {
    fields: intervalFields,
    append: appendInterval,
    remove: removeInterval,
  } = useFieldArray({ control, name: 'intervals' })

  const loadWeekdaysEstablishment = useController({
    control,
    name: 'weekdays',
    defaultValue: [],
  })

  const addNewInterval = () => appendInterval({ open: '', close: '' })
  const removeIntervalByIndex = (index: number) => removeInterval(index)

  const onChangeSelectedWeekdays = (weekdays: string[]) => {
    loadWeekdaysEstablishment.field.onChange(weekdays)
    const currentIntervals = values.intervals ?? []
    const intervalsCount = currentIntervals.length
    const weekdaysCount = weekdays.length

    if (weekdaysCount > intervalsCount) {
      const amountToAdd = weekdaysCount - intervalsCount

      for (let i = 0; i < amountToAdd; i++) {
        appendInterval({ open: '08:00', close: '18:00' })
      }
    }

    if (weekdaysCount < intervalsCount) {
      const amountToRemove = intervalsCount - weekdaysCount

      for (let i = 0; i < amountToRemove; i++) {
        removeInterval(intervalsCount - 1 - i)
      }
    }
  }

  return (
    <Stack
      aria-label="Form Opening Hours"
      gridColumn={{ base: 'span 1', md: 'span 4' }}
    >
      <Fieldset.Root
        invalid={!!errors.weekdays}
        gridColumn={{ base: 'span 1', md: 'span 4' }}
      >
        <Fieldset.Legend fontSize="sm">
          Selecione os dias de funcionamento do estabelecimento
        </Fieldset.Legend>

        <CheckboxGroup
          invalid={!!errors.weekdays}
          name={loadWeekdaysEstablishment.field.name}
          value={loadWeekdaysEstablishment.field.value}
          onValueChange={onChangeSelectedWeekdays}
        >
          <Fieldset.Content display="flex" flexDir="row" gap="2">
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

      <Flex
        w="full"
        gap="4"
        pl="2"
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
        borderWidth="1px"
        rounded="lg"
        shadow={{ base: 'shape', md: '2xs' }}
        p="4"
      >
        <chakra.label
          display="flex"
          flexDir="column"
          alignItems="center"
          gap="4"
        >
          Horário de funcionamento
          <Button
            type="button"
            size="xs"
            rounded="lg"
            variant="ghost"
            colorPalette="green"
            onClick={addNewInterval}
          >
            Adicionar horário
          </Button>
        </chakra.label>

        <Stack direction="row" wrap="wrap" flex="1">
          {intervalFields.map((field, index) => (
            <Flex key={field.id} gap="2" flexDir="row" align="center">
              <Text fontSize="sm" color="secondary.500" w="16">
                {weekDaysLabels[index + 1] ?? weekDaysLabels[0]}
              </Text>
              <HStack gap="2" align="center">
                <Controller
                  name={`intervals.${index}.open`}
                  control={control}
                  render={({ field }) => (
                    <Field
                      invalid={!!errors.intervals?.[index]?.open}
                      errorText={errors.intervals?.[index]?.open?.message}
                    >
                      <PatternFormat
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(values.formattedValue)
                        }
                        format="##:##"
                        placeholder="00:00"
                        mask="_"
                        customInput={InputField}
                      />
                    </Field>
                  )}
                />

                <Controller
                  name={`intervals.${index}.close`}
                  control={control}
                  render={({ field }) => (
                    <Field
                      invalid={!!errors.intervals?.[index]?.close}
                      errorText={errors.intervals?.[index]?.close?.message}
                    >
                      <PatternFormat
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(values.formattedValue)
                        }
                        format="##:##"
                        placeholder="00:00"
                        mask="_"
                        customInput={InputField}
                      />
                    </Field>
                  )}
                />

                {intervalFields.length > 1 && (
                  <Tooltip content="Remover horário" showArrow>
                    <IconButton
                      alignSelf={{ base: 'center', xl: 'flex-start' }}
                      size="xs"
                      rounded="full"
                      variant="ghost"
                      colorPalette="red"
                      onClick={() => removeIntervalByIndex(index)}
                      mt="0.5"
                    >
                      <Icon as={Trash2} boxSize="4" />
                    </IconButton>
                  </Tooltip>
                )}
              </HStack>
            </Flex>
          ))}
        </Stack>

        {errors.intervals?.message && (
          <Alert.Root
            status="error"
            variant="surface"
            data-state="open"
            _open={{
              animationName: 'fade-in, scale-in',
              animationDuration: '300ms',
            }}
          >
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Não foi possível cadastrar</Alert.Title>
              <Alert.Description>{errors.intervals?.message}</Alert.Description>
            </Alert.Content>

            <Button
              size="xs"
              variant="surface"
              rounded="lg"
              onClick={onCloseAlertInterval}
            >
              Fechar
            </Button>
          </Alert.Root>
        )}
      </Flex>
    </Stack>
  )
}

export default FormIntervalEstablishment
