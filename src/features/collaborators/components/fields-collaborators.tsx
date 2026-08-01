import { SimpleGrid } from '@chakra-ui/react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { FormatMask } from '@/shared/utils/formatted-mask'

import {
  type CollaboratorsFormData,
  type CollaboratorsFormDataInput,
} from '../types/form-collaborators.type'

interface FieldsCollaboratorsProps {
  form: UseFormReturn<CollaboratorsFormDataInput, any, CollaboratorsFormData>
}

const FieldsCollaborators = ({ form }: FieldsCollaboratorsProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full" mt="5">
      <Field
        gridColumn={{ base: 'span 1' }}
        invalid={!!form.formState.errors.name}
        errorText={form.formState.errors.name?.message}
      >
        <InputField
          {...form.register('name')}
          placeholder="Digite o nome do colaborador"
        />
      </Field>

      <Field
        gridColumn={{ base: 'span 1' }}
        invalid={!!form.formState.errors.email}
        errorText={form.formState.errors.email?.message}
      >
        <InputField
          {...form.register('email')}
          placeholder="Digite o e-mail do colaborador"
        />
      </Field>

      <Controller
        name="cellphone"
        control={form.control}
        render={({ field }) => (
          <Field
            invalid={!!form.formState.errors.cellphone}
            errorText={form.formState.errors.cellphone?.message}
          >
            <PatternFormat
              value={field.value.replace(/\D/g, '')}
              onValueChange={(values) => field.onChange(values.value)}
              format={FormatMask.CELLPHONE}
              placeholder="(00) 00000-0000"
              mask="_"
              customInput={InputField}
            />
          </Field>
        )}
      />

      <Field
        invalid={!!form.formState.errors.document}
        errorText={form.formState.errors.document?.message}
      >
        <InputField
          {...form.register('document')}
          placeholder="Digite o documento do colaborador"
        />
      </Field>

      <Field
        invalid={!!form.formState.errors.specialty}
        errorText={form.formState.errors.specialty?.message}
      >
        <InputField
          {...form.register('specialty')}
          placeholder="Digite a especialidade do colaborador"
        />
      </Field>

      <Field
        invalid={!!form.formState.errors.workSchedule}
        errorText={form.formState.errors.workSchedule?.message}
      >
        <InputField
          {...form.register('workSchedule')}
          placeholder="Digite o horário de trabalho do colaborador"
        />
      </Field>
    </SimpleGrid>
  )
}

export default FieldsCollaborators
