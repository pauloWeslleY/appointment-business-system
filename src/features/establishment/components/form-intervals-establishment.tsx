import {
  Alert,
  Button,
  chakra,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Fieldset,
  Flex,
  For,
  Stack,
} from '@chakra-ui/react'
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
import { createListWeekDays } from '@/shared/utils/create-list-weekdays'

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

    if (weekdays.length > 0 && currentIntervals.length === 0) {
      appendInterval({ open: '08:00', close: '18:00' })
    }

    if (weekdays.length === 0) {
      removeInterval()
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
            <Flex
              key={field.id}
              gap="2"
              flexDir={{ base: 'column', md: 'row' }}
            >
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
                  <CloseButton
                    alignSelf={{ base: 'center', xl: 'flex-start' }}
                    size="xs"
                    rounded="full"
                    variant="ghost"
                    onClick={() => removeIntervalByIndex(index)}
                    mt="0.5"
                  />
                </Tooltip>
              )}
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
