import {
  createListCollection,
  DatePicker,
  parseDate,
  Portal,
  Select,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react'
import { Calendar } from 'lucide-react'
import { Controller, FormProvider, type UseFormReturn } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { contentCss, inputFieldStyles } from '@/theme/styles/global-styles'

import type { CustomerFormData } from '../types/customer-form-data.type'
import { getTodayIsoDate } from '../utils/customer-birth-date'
import FormPhonesCustomer from './form-phones-customer'

interface FieldsCustomerProps {
  form: UseFormReturn<CustomerFormData>
}

const loadSelectGenderCustomer = createListCollection({
  items: [
    { label: 'Masculino', value: 'male' },
    { label: 'Feminino', value: 'female' },
    { label: 'Outro', value: 'other' },
  ],
})

const FieldsCustomer = ({ form }: FieldsCustomerProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
      <Field
        gridColumn={{ base: '1 / -1' }}
        invalid={!!form.formState.errors.name}
        errorText={form.formState.errors.name?.message}
      >
        <InputField
          {...form.register('name')}
          id="name-create-customer"
          placeholder="Digite o nome do cliente"
        />
      </Field>

      <Field
        gridColumn={{ base: '1 / -1' }}
        invalid={!!form.formState.errors.email}
        errorText={form.formState.errors.email?.message}
      >
        <InputField
          {...form.register('email')}
          placeholder="Digite o e-mail do cliente"
        />
      </Field>

      <Controller
        control={form.control}
        name="birthDate"
        render={({ field }) => (
          <Field
            invalid={Boolean(form.formState.errors.birthDate)}
            errorText={form.formState.errors.birthDate?.message}
          >
            <DatePicker.Root
              size="sm"
              variant="subtle"
              locale="pt-BR"
              invalid={Boolean(form.formState.errors.birthDate)}
              max={parseDate(getTodayIsoDate())}
              value={field.value ? [parseDate(field.value)] : []}
              onValueChange={(e) =>
                field.onChange(e.value[0]?.toString() ?? '')
              }
            >
              <DatePicker.Control>
                <DatePicker.Input
                  {...inputFieldStyles}
                  placeholder="Selecione a data"
                />
                <DatePicker.IndicatorGroup>
                  <DatePicker.Trigger>
                    <Calendar />
                  </DatePicker.Trigger>
                </DatePicker.IndicatorGroup>
              </DatePicker.Control>
              <Portal>
                <DatePicker.Positioner>
                  <DatePicker.Content css={contentCss}>
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
                </DatePicker.Positioner>
              </Portal>
            </DatePicker.Root>
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="gender"
        render={({ field }) => (
          <Field
            invalid={Boolean(form.formState.errors.gender)}
            errorText={form.formState.errors.gender?.message}
          >
            <Select.Root
              w="full"
              size="sm"
              variant="subtle"
              collection={loadSelectGenderCustomer}
              value={field.value as string[]}
              onValueChange={(e) => field.onChange(e.value || '')}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger {...inputFieldStyles}>
                  <Select.ValueText placeholder="Selecione o sexo" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content css={contentCss}>
                    {loadSelectGenderCustomer.items.map((hour) => (
                      <Select.Item
                        key={hour.value}
                        item={hour}
                        rounded="xl"
                        cursor="pointer"
                        _hover={{
                          bg: {
                            base: 'gray.100',
                            _dark: 'secondary.600',
                          },
                        }}
                      >
                        {hour.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Field>
        )}
      />

      <FormProvider {...form}>
        <FormPhonesCustomer />
      </FormProvider>

      <Field
        gridColumn="1 / -1"
        invalid={!!form.formState.errors.notes}
        errorText={form.formState.errors.notes?.message}
      >
        <Textarea
          {...form.register('notes')}
          variant="subtle"
          placeholder="Digite as observações"
          size="sm"
          rows={5}
          {...inputFieldStyles}
        />
      </Field>
    </SimpleGrid>
  )
}

export default FieldsCustomer
