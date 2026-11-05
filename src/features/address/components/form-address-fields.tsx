import { For, SimpleGrid } from '@chakra-ui/react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { FormatMask } from '@/shared/utils/formatted-mask'

import { usePostalCode } from '../hooks/use-postal-code'
import type { AddressFormData } from '../types/address-form.type'

export interface FormAddressFieldsProps {
  form: UseFormReturn<AddressFormData>
}

const FormAddressFields = ({ form }: FormAddressFieldsProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = form
  const { onBlurPostalCode } = usePostalCode(form)

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="4" w="full">
      <Field
        label="CEP"
        invalid={!!errors.postalCode}
        errorText={errors.postalCode?.message}
      >
        <Controller
          control={control}
          name="postalCode"
          render={({ field }) => (
            <PatternFormat
              name={field.name}
              value={field.value}
              getInputRef={field.ref}
              onValueChange={({ value }) => field.onChange(value)}
              onBlur={({ target: { value } }) => {
                field.onBlur()
                onBlurPostalCode(value)
              }}
              customInput={InputField}
              format={FormatMask.ZIP_CODE}
              placeholder="00000-000"
              inputMode="numeric"
            />
          )}
        />
      </Field>

      <For
        each={
          [
            {
              name: 'state',
              label: 'UF',
              placeholder: 'SP',
              maxLength: 2,
            },
            {
              name: 'city',
              label: 'Cidade',
              placeholder: 'São Paulo',
              maxLength: 150,
            },
            {
              name: 'street',
              label: 'Logradouro',
              placeholder: 'Rua ou avenida',
              maxLength: 200,
            },
            {
              name: 'neighborhood',
              label: 'Bairro',
              placeholder: 'Centro',
              maxLength: 150,
            },
            {
              name: 'number',
              label: 'Número',
              placeholder: '123 ou S/N',
              maxLength: 20,
            },
            {
              name: 'complement',
              label: 'Complemento (opcional)',
              placeholder: 'Sala, bloco ou andar',
              maxLength: 200,
            },
          ] as const
        }
      >
        {({ name, label, placeholder, maxLength }) => (
          <Field
            key={name}
            label={label}
            invalid={!!errors[name]}
            errorText={errors[name]?.message}
            gridColumn={{
              base: 'span 1',
              md: name === 'neighborhood' ? 'span 2' : 'span 1',
            }}
          >
            <InputField
              {...register(name)}
              placeholder={placeholder}
              maxLength={maxLength}
            />
          </Field>
        )}
      </For>
    </SimpleGrid>
  )
}

export default FormAddressFields
