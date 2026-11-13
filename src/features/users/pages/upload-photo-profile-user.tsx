import { Alert, Button, chakra, FileUpload, Icon } from '@chakra-ui/react'
import { Upload, UploadCloud } from 'lucide-react'
import { Controller } from 'react-hook-form'

import FileUploadCardItem from '@/components/file-upload-item'
import { Field } from '@/components/ui/field'

import { useUploadPhotoProfile } from '../hooks/use-upload-photo-profile'

const UploadPhotoProfileUser = () => {
  const {
    control,
    errors,
    isSubmitting,
    handleSubmit,
    handleClearErrorsUploadPhotoProfile,
    onSubmitUploadPhotoProfile,
  } = useUploadPhotoProfile()

  return (
    <chakra.form
      onSubmit={handleSubmit(onSubmitUploadPhotoProfile)}
      display="flex"
      flexDir="column"
      gap="2"
      w="full"
    >
      <Controller
        control={control}
        name="image"
        render={({ field }) => (
          <Field>
            <FileUpload.Root>
              <FileUpload.HiddenInput
                onChange={(event) => field.onChange(event.target?.files?.[0])}
              />
              <FileUpload.Trigger asChild>
                <Button
                  colorPalette="primary"
                  variant="outline"
                  size="sm"
                  rounded="lg"
                  w="full"
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
          </Field>
        )}
      />

      <Button
        type="submit"
        size="sm"
        rounded="lg"
        colorPalette="brand"
        loading={isSubmitting}
      >
        <Icon as={UploadCloud} />
        Atualizar foto
      </Button>

      {errors.image && (
        <Alert.Root status="error" variant="subtle" rounded="lg">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{errors.image.message}</Alert.Title>
          </Alert.Content>

          <Button size="2xs" onClick={handleClearErrorsUploadPhotoProfile}>
            Fechar
          </Button>
        </Alert.Root>
      )}
    </chakra.form>
  )
}

export default UploadPhotoProfileUser
