import { Box, Button, chakra, FileUpload, SimpleGrid } from '@chakra-ui/react'
import { Upload } from 'lucide-react'
import { Controller } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import { useUpdateProfile } from '../hooks/use-update-profile'

const FormProfileUser = () => {
  const {
    control,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmitUpdateProfile,
  } = useUpdateProfile()

  return (
    <chakra.form onSubmit={handleSubmit(onSubmitUpdateProfile)}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <Field invalid={!!errors.name} errorText={errors.name?.message}>
          <InputField placeholder="Usuário" {...register('name')} />
        </Field>

        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <FileUpload.Root>
              <FileUpload.HiddenInput
                onChange={(event) => field.onChange(event.target?.files?.[0])}
              />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm" rounded="xl">
                  <Upload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>
          )}
        />

        <Box gridColumn={{ base: 'span 1', md: 'span 2' }} placeSelf="end">
          <Button
            type="submit"
            size="sm"
            rounded="xl"
            variant="subtle"
            colorPalette="emerald"
            loading={isSubmitting}
          >
            Salvar
          </Button>
        </Box>
      </SimpleGrid>
    </chakra.form>
  )
}

export default FormProfileUser
