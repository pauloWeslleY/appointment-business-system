import {
  Box,
  Button,
  FileUpload,
  Flex,
  Grid,
  Icon,
  Image,
} from '@chakra-ui/react'
import { FileImage, Upload, UploadCloud } from 'lucide-react'
import { Controller } from 'react-hook-form'

import FileUploadCardItem from '@/components/file-upload-item'
import { Field } from '@/components/ui/field'

import { useUploadImageEstablishment } from '../hooks/use-upload-image-establishment'

const UploadImageEstablishment = () => {
  const {
    errors,
    control,
    establishment,
    isPendingUploadImageEstablishment,
    handleSubmit,
    onSubmitUploadImageEstablishment,
  } = useUploadImageEstablishment()

  return (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="4" mt="4">
      <Box display="flex" flexDirection="column" gap="2" h="fit">
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <Field
              invalid={Boolean(errors.file)}
              errorText={errors.file?.message}
              label="Imagem do estabelecimento"
            >
              <FileUpload.Root rounded="xl" alignItems="stretch" maxFiles={10}>
                <FileUpload.HiddenInput
                  onChange={(e) => field.onChange(e.target.files?.[0])}
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
                    <Box>Drag and drop files here</Box>
                    <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>

                <FileUpload.ItemGroup mt="1">
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
          w="fit"
          size="sm"
          rounded="lg"
          alignSelf="flex-end"
          colorPalette="brand"
          loading={isPendingUploadImageEstablishment}
          onClick={handleSubmit(onSubmitUploadImageEstablishment)}
        >
          <Icon as={UploadCloud} boxSize="5" />
          Salvar
        </Button>
      </Box>

      <div>
        {establishment?.imageUrl ? (
          <Image
            border="1px solid"
            borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            shadow="xs"
            rounded="xl"
            h="auto"
            w="full"
            fit="contain"
            src={establishment.imageUrl}
          />
        ) : (
          <Flex
            w="full"
            p="2"
            bg={{ base: 'gray.200', _dark: 'gray.800' }}
            rounded="lg"
            placeContent="center"
          >
            <Icon boxSize="32">
              <FileImage />
            </Icon>
          </Flex>
        )}
      </div>
    </Grid>
  )
}

export default UploadImageEstablishment
