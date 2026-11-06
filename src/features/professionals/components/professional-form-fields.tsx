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
import { Controller, type UseFormReturn } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import FileUploadCardItem from '@/components/file-upload-item'
import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { contentCss } from '@/theme/styles/global-styles'

import type {
  ProfessionalFormData,
  ProfessionalFormInput,
} from '../types/professional-form.type'
import ProfessionalWorkScheduleFields from './professional-work-schedule-fields'

interface ProfessionalFormFieldsProps {
  form: UseFormReturn<ProfessionalFormInput, unknown, ProfessionalFormData>
  imageUrl?: string | null
}

const loadSelectEmploymentStatus = createListCollection({
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
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <Field
          label="Nome"
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
                collection={loadSelectEmploymentStatus}
                value={field.value ? [field.value] : []}
                onValueChange={(e) => field.onChange(e.value[0])}
                onInteractOutside={() => field.onBlur()}
              >
                <Select.HiddenSelect name={field.name} />
                <Select.Control>
                  <Select.Trigger
                    rounded="xl"
                    bg={{ base: 'blackAlpha.100', _dark: 'gray.800/40' }}
                  >
                    <Select.ValueText placeholder="Selecione o status" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content css={contentCss}>
                      {loadSelectEmploymentStatus.items.map((status) => (
                        <Select.Item
                          key={status.value}
                          item={status}
                          rounded="xl"
                          cursor="pointer"
                          _hover={{
                            bg: { base: 'gray.100', _dark: 'secondary.600' },
                          }}
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

        <Field
          gridColumn={{ base: 'span 1', md: 'span 2' }}
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
          gridColumn={{ base: 'span 1', md: 'span 2' }}
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
                  <Button variant="outline" size="sm" rounded="lg">
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
      </SimpleGrid>

      <ProfessionalWorkScheduleFields form={form} />
    </Stack>
  )
}

export default ProfessionalFormFields
