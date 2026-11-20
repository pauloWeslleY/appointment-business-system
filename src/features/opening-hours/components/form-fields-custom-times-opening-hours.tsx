import {
  Alert,
  Button,
  Flex,
  For,
  Grid,
  Icon,
  IconButton,
} from '@chakra-ui/react'
import { Trash2Icon } from 'lucide-react'
import {
  type Control,
  Controller,
  type FieldErrors,
  useFieldArray,
} from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'
import { Tooltip } from '@/components/ui/tooltip'

import type { CustomTimesOpeningHoursFormData } from '../types/customer-times-opening-hours.api.type'

interface FormFieldCustomTimesOpeningHoursProps {
  customTimesCapacity: number
  control: Control<CustomTimesOpeningHoursFormData>
  errors: FieldErrors<CustomTimesOpeningHoursFormData>
}

const FormFieldCustomTimesOpeningHours = ({
  customTimesCapacity,
  control,
  errors,
}: FormFieldCustomTimesOpeningHoursProps) => {
  const {
    fields: customTimeFields,
    append: appendCustomTime,
    remove: removeCustomTime,
  } = useFieldArray({ name: 'customTimes', control })

  const addNewCustomTime = () => {
    if (customTimeFields.length >= customTimesCapacity) {
      toaster.error({
        title: 'Capacidade máxima atingida',
        description: `Este período comporta até ${customTimesCapacity} horários distintos.`,
      })
      return
    }

    appendCustomTime({ time: '' })
  }

  const removeCustomTimeByIndex = (index: number) => removeCustomTime(index)

  return (
    <Flex
      aria-label="Form Custom Times Opening Hours"
      flexDir="column"
      w="full"
      p="2"
      minW="0"
      rounded="xl"
      gap={{ base: '2', xl: '4' }}
      borderWidth="1px"
      borderColor={{ _light: 'gray.200', _dark: 'secondary.500/20' }}
      h={{ base: '20', xl: 'auto' }}
      overflow={{ base: 'auto', xl: 'visible' }}
    >
      <Button
        type="button"
        size="xs"
        rounded="lg"
        variant="ghost"
        colorPalette="green"
        onClick={addNewCustomTime}
        alignSelf={{ base: 'center', xl: 'flex-start' }}
      >
        Adicionar horário
      </Button>

      <Grid
        templateColumns="repeat(auto-fit, minmax(min(150px, 100%), 1fr))"
        gap="2"
        flex="1"
      >
        <For each={customTimeFields}>
          {(field, index) => (
            <Flex key={field.id} gap="2">
              <Controller
                name={`customTimes.${index}.time`}
                control={control}
                render={({ field }) => (
                  <Field
                    invalid={!!errors.customTimes?.[index]?.time}
                    errorText={errors.customTimes?.[index]?.time?.message}
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

              {customTimeFields.length > 1 && (
                <Tooltip content="Remover horário" showArrow>
                  <IconButton
                    alignSelf={{ base: 'center', xl: 'flex-start' }}
                    size="xs"
                    rounded="full"
                    variant="ghost"
                    colorPalette="red"
                    onClick={() => removeCustomTimeByIndex(index)}
                    mt="0.5"
                  >
                    <Icon as={Trash2Icon} boxSize="4" />
                  </IconButton>
                </Tooltip>
              )}
            </Flex>
          )}
        </For>
      </Grid>

      {errors.customTimes?.message && (
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
            <Alert.Description>{errors.customTimes?.message}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </Flex>
  )
}

export default FormFieldCustomTimesOpeningHours
