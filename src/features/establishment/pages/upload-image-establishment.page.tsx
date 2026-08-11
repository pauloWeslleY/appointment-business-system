import {
  Box,
  Button,
  Card,
  FileUpload,
  Flex,
  Icon,
  Image,
  SimpleGrid,
} from '@chakra-ui/react'
import { FileImage, Upload, UploadCloud } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import { colorDefaultTheme } from '@/shared/constants/color-default-theme'

import { useUploadImageEstablishment } from '../hooks/use-upload-image-establishment'

const UploadImageEstablishment = () => {
  const {
    errors,
    control,
    getEstablishment,
    handleSubmit,
    onSubmitUploadImageEstablishment,
    isPendingUploadImageEstablishment,
  } = useUploadImageEstablishment()

  return (
    <SimpleGrid gap="2" columns={{ base: 1, lg: 2 }} w="full">
      <Box>
        {getEstablishment?.imageUrl && (
          <Image
            border="1px solid"
            borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            shadow="xs"
            rounded="xl"
            h="auto"
            w="full"
            fit="contain"
            src={getEstablishment.imageUrl}
          />
        )}

        {!getEstablishment?.imageUrl && (
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
      </Box>

      <Card.Root
        variant="outline"
        rounded="xl"
        shadow="xs"
        p="4"
        bg={{ base: 'white', _dark: 'gray.950/40' }}
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
        display="flex"
        flexDirection="column"
        gap="2"
        h="fit"
      >
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
                  borderColor={{
                    base: 'gray.200',
                    _dark: 'secondary.500/20',
                  }}
                >
                  <Icon size="md" color="fg.muted">
                    <Upload />
                  </Icon>
                  <FileUpload.DropzoneContent>
                    <Box>Drag and drop files here</Box>
                    <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List />
              </FileUpload.Root>
            </Field>
          )}
        />

        <Button
          size="sm"
          rounded="xl"
          w="fit"
          alignSelf="flex-end"
          variant="surface"
          colorPalette={colorDefaultTheme}
          loading={isPendingUploadImageEstablishment}
          onClick={handleSubmit(onSubmitUploadImageEstablishment)}
        >
          <Icon as={UploadCloud} boxSize="5" />
          Salvar
        </Button>
      </Card.Root>
    </SimpleGrid>
  )
}

export default UploadImageEstablishment
