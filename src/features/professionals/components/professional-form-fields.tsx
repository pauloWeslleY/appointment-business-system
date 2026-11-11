import {
  Button,
  createListCollection,
  FileUpload,
  Image,
  Portal,
  Select,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { Upload } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import FileUploadCardItem from '@/components/file-upload-item'
import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import {
  contentCss,
  inputFieldStyles,
  menuItemCss,
} from '@/theme/styles/global-styles'

import type { ProfessionalFormMethods } from '../types/professional-form.type'
import ProfessionalWorkScheduleFields from './professional-work-schedule-fields'

interface ProfessionalFormFieldsProps {
  form: ProfessionalFormMethods
  imageUrl?: string | null
}

const employmentStatusOptions = createListCollection({
  items: [
    { label: 'Ativo', value: 'active' },
    { label: 'Inativo', value: 'inactive' },
    { label: 'Suspenso', value: 'suspended' },
  ],
})

const ProfessionalFormFields = ({
  form,
  imageUrl,
}: ProfessionalFormFieldsProps) => {
  const { errors } = form.formState

  return (
    <Stack gap="4">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
        <Field
          label="Nome"
          optionalText="*"
          invalid={!!errors.displayName}
          errorText={errors.displayName?.message}
        >
          <InputField
            {...form.register('displayName')}
            placeholder="Digite o nome do profissional"
            maxLength={160}
          />
        </Field>

        <Field
          label="Especialidade"
          optionalText="*"
          invalid={!!errors.specialty}
          errorText={errors.specialty?.message}
        >
          <InputField
            {...form.register('specialty')}
            placeholder="Ex.: Barbeiro, Manicure, Esteticista"
            maxLength={160}
          />
        </Field>

        <Field
          label="E-mail (opcional)"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          <InputField
            {...form.register('email')}
            type="email"
            placeholder="profissional@email.com"
            maxLength={254}
          />
        </Field>

        <Controller
          control={form.control}
          name="phone"
          render={({ field }) => (
            <Field
              label="Telefone (opcional)"
              invalid={!!errors.phone}
              errorText={errors.phone?.message}
            >
              <PatternFormat
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                getInputRef={field.ref}
                onValueChange={(values) => field.onChange(values.value)}
                format="(##) #####-####"
                placeholder="(00) 00000-0000"
                mask="_"
                type="tel"
                customInput={InputField}
              />
            </Field>
          )}
        />

        <Field
          label="Documento (opcional)"
          invalid={!!errors.document}
          errorText={errors.document?.message}
        >
          <InputField
            {...form.register('document')}
            placeholder="CPF ou outro documento"
            maxLength={2000}
          />
        </Field>

        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <Field
              label="Status do vínculo"
              invalid={!!errors.status}
              errorText={errors.status?.message}
            >
              <Select.Root
                w="full"
                size="sm"
                variant="subtle"
                collection={employmentStatusOptions}
                value={field.value ? [field.value] : []}
                onValueChange={(statusSelection) =>
                  field.onChange(statusSelection.value[0])
                }
                onInteractOutside={() => field.onBlur()}
              >
                <Select.HiddenSelect name={field.name} />
                <Select.Control>
                  <Select.Trigger {...inputFieldStyles}>
                    <Select.ValueText placeholder="Selecione o status" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content css={contentCss}>
                      {employmentStatusOptions.items.map((status) => (
                        <Select.Item
                          key={status.value}
                          item={status}
                          {...menuItemCss}
                        >
                          {status.label}
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
      </SimpleGrid>

      <Field
        label="Sobre o profissional (opcional)"
        invalid={!!errors.bio}
        errorText={errors.bio?.message}
      >
        <InputField
          {...form.register('bio')}
          placeholder="Conte um pouco sobre a experiência do profissional"
          maxLength={2000}
        />
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

        <Controller
          control={form.control}
          name="image"
          render={({ field }) => (
            <FileUpload.Root placeContent="flex-end">
              <FileUpload.HiddenInput
                onChange={(event) => field.onChange(event.target?.files)}
              />
              <FileUpload.Trigger asChild>
                <Button
                  colorPalette="secondary"
                  variant="surface"
                  size="sm"
                  rounded="lg"
                >
                  <Upload /> Selecionar arquivo
                </Button>
              </FileUpload.Trigger>

              <FileUpload.ItemGroup mt="1" gap="2">
                <FileUpload.Context>
                  {({ acceptedFiles }) =>
                    acceptedFiles.map((file) => (
                      <FileUploadCardItem key={file.name} file={file} />
                    ))
                  }
                </FileUpload.Context>
              </FileUpload.ItemGroup>
            </FileUpload.Root>
          )}
        />
      </Field>

      <ProfessionalWorkScheduleFields form={form} />
    </Stack>
  )
}

export default ProfessionalFormFields
