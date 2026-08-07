'use client'

import {
  Box,
  Button,
  CloseButton,
  Drawer,
  FileUpload,
  Icon,
  Portal,
} from '@chakra-ui/react'
import { PlusIcon, Upload } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import { contentCss } from '@/theme/styles/global-styles'

import { useFormCreateCollaborators } from '../hooks/use-form-create-collaborators'
import FieldsCollaborators from './fields-collaborators'

const SidebarCreateCollaborators = () => {
  const { form, isPendingCreateCollaborators, onSubmitCreateCollaborators } =
    useFormCreateCollaborators()

  return (
    <Drawer.Root size="lg">
      <Drawer.Trigger asChild>
        <Button rounded="xl" size="xs" variant="surface" colorPalette="emerald">
          <Icon as={PlusIcon} boxSize="5" />
          Novo Colaborador
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Drawer.Positioner>
          <Drawer.Content css={contentCss}>
            <Drawer.Header>
              <Drawer.Title>Novo Colaborador</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <FieldsCollaborators form={form} />

              <Controller
                name="image"
                control={form.control}
                render={({ field }) => (
                  <Field
                    invalid={!!form.formState.errors.image}
                    errorText={form.formState.errors.image?.message}
                    label="Foto do Colaborador"
                    w="full"
                    mt="5"
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
                        w="full"
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
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="surface"
                  colorPalette="red"
                  rounded="xl"
                >
                  Cancelar
                </Button>
              </Drawer.ActionTrigger>

              <Button
                size="sm"
                variant="surface"
                colorPalette="primary"
                rounded="xl"
                onClick={onSubmitCreateCollaborators}
                loading={isPendingCreateCollaborators}
              >
                Salvar
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default SidebarCreateCollaborators
