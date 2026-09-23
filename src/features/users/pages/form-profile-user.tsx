import { Box, Button, chakra, FileUpload, SimpleGrid } from '@chakra-ui/react'
import { FileText, Upload, X } from 'lucide-react'
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
                  <Upload /> Selecionar arquivo
                </Button>
              </FileUpload.Trigger>

              <FileUpload.ItemGroup mt="1" gap="2">
                <FileUpload.Context>
                  {({ acceptedFiles }) =>
                    acceptedFiles.map((file) => (
                      <FileUpload.Item
                        key={file.name}
                        file={file}
                        px="4"
                        py="3"
                        rounded="lg"
                        borderWidth="1px"
                        borderColor={{
                          base: 'gray.300',
                          _dark: 'secondary.500/20',
                        }}
                        bg={{ base: 'secondary.200', _dark: 'gray.900' }}
                        color={{ base: 'gray.900', _dark: 'white' }}
                      >
                        <FileText size={18} />

                        <FileUpload.ItemName
                          flex="1"
                          minW="0"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        />

                        <FileUpload.ItemDeleteTrigger
                          aria-label={`Remover ${file.name}`}
                          color="gray.400"
                          _hover={{ color: 'red.400' }}
                        >
                          <X size={16} />
                        </FileUpload.ItemDeleteTrigger>
                      </FileUpload.Item>
                    ))
                  }
                </FileUpload.Context>
              </FileUpload.ItemGroup>
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
