import { Box, FileUpload, Icon } from '@chakra-ui/react'
import { Upload } from 'lucide-react'
import { type Control, Controller, type FieldErrors } from 'react-hook-form'

import FileUploadCardItem from '@/components/file-upload-item'
import { Field } from '@/components/ui/field'
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from '@/shared/constants/files-config'

import type {
  ServiceEstablishmentFormData,
  ServiceEstablishmentFormInput,
} from '../types/form-service-establishment.type'

interface UploadImageServiceEstablishmentProps {
  control: Control<
    ServiceEstablishmentFormInput,
    unknown,
    ServiceEstablishmentFormData
  >
  errors: FieldErrors<ServiceEstablishmentFormInput>
}

const UploadImageServiceEstablishment = ({
  control,
  errors,
}: UploadImageServiceEstablishmentProps) => {
  return (
    <Controller
      name="image"
      control={control}
      render={({ field }) => (
        <Field
          flex="1"
          invalid={Boolean(errors.image)}
          errorText={errors.image?.message}
        >
          <FileUpload.Root
            alignItems="stretch"
            maxFiles={1}
            maxFileSize={MAX_IMAGE_SIZE}
            accept={[...ACCEPTED_IMAGE_TYPES]}
            rounded="xl"
          >
            <FileUpload.HiddenInput
              onChange={(e) => field.onChange(e.target.files)}
            />
            <FileUpload.Dropzone
              rounded="xl"
              bg="gray.700/10"
              borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            >
              <Icon size="md" color="fg.muted">
                <Upload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box>Arraste a imagem ou clique para selecionar</Box>
                <Box color="fg.muted">JPG, PNG ou WebP de até 5 MB</Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>

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
  )
}

export default UploadImageServiceEstablishment
