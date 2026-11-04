import {
  Button,
  chakra,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useFieldArray, type UseFormReturn } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import type {
  ProfessionalFormData,
  ProfessionalFormInput,
} from '../types/professional-form.type'
interface ProfessionalFormFieldsProps {
  form: UseFormReturn<ProfessionalFormInput, unknown, ProfessionalFormData>
  imageUrl?: string | null
}
const textFields = [
  { name: 'displayName', label: 'Nome', maxLength: 160 },
  { name: 'email', label: 'E-mail (opcional)', maxLength: 254 },
  { name: 'phone', label: 'Telefone (opcional)', maxLength: 40 },
  { name: 'document', label: 'Documento (opcional)', maxLength: 2000 },
  { name: 'bio', label: 'Sobre o profissional (opcional)', maxLength: 2000 },
  { name: 'specialty', label: 'Especialidade', maxLength: 160 },
] as const
const weekdays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]
const ProfessionalFormFields = ({
  form,
  imageUrl,
}: ProfessionalFormFieldsProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'workSchedule',
  })
  const { errors } = form.formState
  return (
    <Stack gap="4">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        {textFields.map(({ name, label, maxLength }) => (
          <Field
            key={name}
            label={label}
            invalid={!!errors[name]}
            errorText={errors[name]?.message}
          >
            <InputField
              {...form.register(name)}
              type={name === 'email' ? 'email' : 'text'}
              maxLength={maxLength}
            />
          </Field>
        ))}
        <Field
          label="Status do vínculo"
          invalid={!!errors.status}
          errorText={errors.status?.message}
        >
          <chakra.select
            {...form.register('status')}
            p="2"
            borderWidth="1px"
            rounded="lg"
            bg="bg"
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
            <option value="suspended">Suspenso</option>
          </chakra.select>
        </Field>
        <Field
          label="Foto (opcional)"
          invalid={!!errors.image}
          errorText={errors.image?.message}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Foto atual do profissional"
              boxSize="16"
              rounded="full"
              objectFit="cover"
            />
          )}
          <InputField
            type="file"
            accept="image/jpeg,image/png,image/webp"
            {...form.register('image')}
          />
        </Field>
      </SimpleGrid>
      <Text fontWeight="medium">Horários de trabalho</Text>
      {fields.length === 0 && <Text>Nenhum período definido.</Text>}
      {fields.map((field, index) => (
        <Stack
          key={field.id}
          direction={{ base: 'column', md: 'row' }}
          align="end"
        >
          <Field label="Dia">
            <chakra.select
              {...form.register(`workSchedule.${index}.dayOfWeek`, {
                valueAsNumber: true,
              })}
              p="2"
              bg="bg"
              borderWidth="1px"
              rounded="lg"
            >
              {weekdays.map((day, value) => (
                <option key={day} value={value}>
                  {day}
                </option>
              ))}
            </chakra.select>
          </Field>
          <Field
            label="Início"
            invalid={!!errors.workSchedule?.[index]?.startsAt}
            errorText={errors.workSchedule?.[index]?.startsAt?.message}
          >
            <InputField
              type="time"
              {...form.register(`workSchedule.${index}.startsAt`)}
            />
          </Field>
          <Field
            label="Fim"
            invalid={!!errors.workSchedule?.[index]?.endsAt}
            errorText={errors.workSchedule?.[index]?.endsAt?.message}
          >
            <InputField
              type="time"
              {...form.register(`workSchedule.${index}.endsAt`)}
            />
          </Field>
          <Button
            type="button"
            variant="ghost"
            colorPalette="red"
            onClick={() => remove(index)}
            aria-label={'Remover período ' + (index + 1)}
          >
            Remover
          </Button>
        </Stack>
      ))}
      {errors.workSchedule?.message && (
        <Text role="alert">{errors.workSchedule.message}</Text>
      )}
      <Button
        type="button"
        variant="outline"
        alignSelf="start"
        disabled={fields.length >= 84}
        onClick={() =>
          append({ dayOfWeek: 1, startsAt: '09:00', endsAt: '18:00' })
        }
      >
        Adicionar período
      </Button>
    </Stack>
  )
}
export default ProfessionalFormFields
