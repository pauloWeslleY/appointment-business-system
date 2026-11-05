import { Box, Flex, For, HStack, RadioGroup } from '@chakra-ui/react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import type { OpeningHoursFormData } from '../types/opening-hours-form.type'

export interface FormOpeningHoursFieldsProps {
  form: UseFormReturn<OpeningHoursFormData>
}

const FormOpeningHoursFields = ({ form }: FormOpeningHoursFieldsProps) => {
  return (
    <Box spaceY="4">
      <Controller
        name="day"
        control={form.control}
        render={({ field }) => (
          <Field
            label="Dia da semana"
            invalid={Boolean(form.formState.errors.day)}
            errorText={form.formState.errors.day?.message}
          >
            <RadioGroup.Root
              name={field.name}
              value={field.value.toString()}
              onValueChange={({ value }) => {
                field.onChange(value)
              }}
            >
              <HStack gap="4" flexWrap="wrap">
                <For
                  each={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda' },
                    { value: '2', label: 'Terça' },
                    { value: '3', label: 'Quarta' },
                    { value: '4', label: 'Quinta' },
                    { value: '5', label: 'Sexta' },
                    { value: '6', label: 'Sábado' },
                  ]}
                >
                  {({ value, label }) => (
                    <RadioGroup.Item key={value} value={value}>
                      <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  )}
                </For>
              </HStack>
            </RadioGroup.Root>
          </Field>
        )}
      />

      <Flex gap="4" w="full" flexDir={{ base: 'column', sm: 'row' }}>
        <Controller
          control={form.control}
          name="open"
          render={({ field }) => (
            <Field
              label="Aberto"
              invalid={Boolean(form.formState.errors.open)}
              errorText={form.formState.errors.open?.message}
            >
              <PatternFormat
                name={field.name}
                value={field.value}
                getInputRef={field.ref}
                onValueChange={({ formattedValue }) =>
                  field.onChange(formattedValue)
                }
                customInput={InputField}
                format="##:##"
                placeholder="00:00"
                inputMode="numeric"
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="close"
          render={({ field }) => (
            <Field
              label="Fechado"
              invalid={Boolean(form.formState.errors.close)}
              errorText={form.formState.errors.close?.message}
            >
              <PatternFormat
                name={field.name}
                value={field.value}
                getInputRef={field.ref}
                onValueChange={({ formattedValue }) =>
                  field.onChange(formattedValue)
                }
                customInput={InputField}
                format="##:##"
                placeholder="00:00"
                inputMode="numeric"
              />
            </Field>
          )}
        />
      </Flex>
    </Box>
  )
}

export default FormOpeningHoursFields
