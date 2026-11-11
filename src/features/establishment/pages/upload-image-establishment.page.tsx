import {
  Box,
  Button,
  EmptyState,
  Fieldset,
  FileUpload,
  Grid,
  Icon,
  Image,
  VStack,
} from '@chakra-ui/react'
import { FileImage, Upload, UploadCloud } from 'lucide-react'
import { Controller } from 'react-hook-form'

import FileUploadCardItem from '@/components/file-upload-item'
import { Field } from '@/components/ui/field'

import { useUploadImageEstablishment } from '../hooks/use-upload-image-establishment'

interface UploadImageEstablishmentProps {
  establishmentSlug: string
}

const UploadImageEstablishment = ({
  establishmentSlug,
}: UploadImageEstablishmentProps) => {
  const {
    errors,
    control,
    establishment,
    isPendingUploadImageEstablishment,
    handleSubmit,
    onSubmitUploadImageEstablishment,
  } = useUploadImageEstablishment(establishmentSlug)

  return (
    <Grid
      templateColumns={{
        base: 'minmax(0, 1fr)',
        md: 'repeat(2, minmax(0, 1fr))',
      }}
      gap="4"
      mt="4"
    >
      <Fieldset.Root
        p="4"
        rounded="xl"
        borderWidth="1px"
        borderColor={{ _light: 'gray.200', _dark: 'slate.800/80' }}
      >
        <Fieldset.Legend fontSize="lg">Upload de imagem</Fieldset.Legend>
        <Fieldset.HelperText mt="0">
          Faça upload de uma imagem para o estabelecimento. <br /> Deixe em
          branco para não alterar a imagem atual.
        </Fieldset.HelperText>

        <Fieldset.Content display="flex" flexDirection="column" gap="2" h="fit">
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <Field
                invalid={Boolean(errors.file)}
                errorText={errors.file?.message}
              >
                <FileUpload.Root
                  rounded="xl"
                  alignItems="stretch"
                  maxFiles={10}
                >
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
        </Fieldset.Content>
      </Fieldset.Root>

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
          <EmptyState.Root h="full">
            <EmptyState.Content h="full">
              <EmptyState.Indicator>
                <FileImage />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>Nenhuma imagem disponível</EmptyState.Title>
                <EmptyState.Description>
                  Estabelecimento não possui imagem
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        )}
      </div>
    </Grid>
  )
}

export default UploadImageEstablishment
