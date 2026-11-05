import { GridItem } from '@chakra-ui/react'
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import type {
  ServiceEstablishmentFormData,
  ServiceEstablishmentFormInput,
} from '../types/form-service-establishment.type'

interface FieldsServiceEstablishmentProps {
  control: Control<
    ServiceEstablishmentFormInput,
    unknown,
    ServiceEstablishmentFormData
  >
  register: UseFormRegister<ServiceEstablishmentFormInput>
  errors: FieldErrors<ServiceEstablishmentFormInput>
}

const FieldsServiceEstablishment = ({
  control,
  register,
  errors,
}: FieldsServiceEstablishmentProps) => {
  return (
    <>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Field
          required
          label="Nome"
          invalid={Boolean(errors.name)}
          errorText={errors.name?.message}
        >
          <InputField
            {...register('name')}
            placeholder="Digite o nome do serviço"
          />
        </Field>
      </GridItem>

      <Controller
        control={control}
        name="servicePriceInCents"
        render={({ field }) => (
          <Field
            required
            label="Preço"
            invalid={Boolean(errors.servicePriceInCents)}
            errorText={errors.servicePriceInCents?.message}
          >
            <NumericFormat
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onValueChange={(value) => field.onChange(value.floatValue ?? 0)}
              decimalScale={2}
              fixedDecimalScale
              decimalSeparator=","
              allowNegative={false}
              allowLeadingZeros={false}
              thousandSeparator="."
              customInput={InputField}
              prefix="R$ "
              placeholder="R$ 0,00"
            />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="durationInMinutes"
        render={({ field }) => (
          <Field
            required
            label="Duração"
            helperText="Tempo do atendimento, usado para calcular a agenda."
            invalid={Boolean(errors.durationInMinutes)}
            errorText={errors.durationInMinutes?.message}
          >
            <NumericFormat
              name={field.name}
              value={field.value ?? ''}
              onBlur={field.onBlur}
              onValueChange={(value) => field.onChange(value.floatValue)}
              decimalScale={0}
              allowNegative={false}
              allowLeadingZeros={false}
              customInput={InputField}
              suffix=" min"
              placeholder="Ex.: 30 min"
              inputMode="numeric"
            />
          </Field>
        )}
      />

      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Field
          required
          label="Descrição"
          invalid={Boolean(errors.description)}
          errorText={errors.description?.message}
        >
          <InputField
            {...register('description')}
            placeholder="Digite a descrição do serviço"
          />
        </Field>
      </GridItem>
    </>
  )
}

export default FieldsServiceEstablishment
