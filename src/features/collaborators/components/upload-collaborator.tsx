import {
  Avatar,
  Box,
  FileUpload,
  Flex,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react'
import { Upload } from 'lucide-react'
import { Controller, type UseFormReturn } from 'react-hook-form'

import { Field } from '@/components/ui/field'

import type { CollaboratorEstablishmentModel } from '../types/collaborator-establishment.type'
import type {
  CollaboratorsFormData,
  CollaboratorsFormDataInput,
} from '../types/form-collaborators.type'

interface UploadCollaboratorProps {
  collaborator: CollaboratorEstablishmentModel
  form: UseFormReturn<CollaboratorsFormDataInput, any, CollaboratorsFormData>
}

const UploadCollaborator = ({
  collaborator,
  form,
}: UploadCollaboratorProps) => {
  return (
    <Flex w="full" gap="4" mt="5" flexDir="column">
      <HStack
        align="center"
        shadow="xs"
        rounded="xl"
        p="2"
        gap="2"
        bg="gray.700/10"
        borderWidth="1px"
        borderColor="gray.100/10"
      >
        <Avatar.Root size="md">
          {collaborator.imageUrl && (
            <Avatar.Image alt={collaborator.name} src={collaborator.imageUrl} />
          )}
          <Avatar.Fallback />
        </Avatar.Root>

        <Text>{collaborator.name}</Text>
      </HStack>

      <Controller
        name="image"
        control={form.control}
        render={({ field }) => (
          <Field
            invalid={!!form.formState.errors.image}
            errorText={form.formState.errors.image?.message}
            label="Foto do Colaborador"
            w="full"
          >
            <FileUpload.Root rounded="xl" alignItems="stretch" maxFiles={1}>
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
                  <Box>Drag and drop files here</Box>
                  <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>

              <FileUpload.List />
            </FileUpload.Root>
          </Field>
        )}
      />
    </Flex>
  )
}

export default UploadCollaborator
