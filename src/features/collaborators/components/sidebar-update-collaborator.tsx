'use client'

import { Button, CloseButton, Drawer, Portal } from '@chakra-ui/react'

import { contentCss } from '@/theme/styles/global-styles'

import { useFormUpdateCollaborator } from '../hooks/use-form-update-collaborator'
import type { CollaboratorEstablishmentModel } from '../types/collaborator-establishment.type'
import FieldsCollaborators from './fields-collaborators'
import UploadCollaborator from './upload-collaborator'

interface SidebarUpdateCollaboratorProps {
  open: boolean
  onOpen: (open: boolean) => void
  collaborator: CollaboratorEstablishmentModel
}

const SidebarUpdateCollaborator = ({
  open,
  onOpen,
  collaborator,
}: SidebarUpdateCollaboratorProps) => {
  const { form, isPendingUpdateCollaborator, onSubmitUpdateCollaborator } =
    useFormUpdateCollaborator(collaborator)

  return (
    <Drawer.Root size="lg" open={open} onOpenChange={(e) => onOpen(e.open)}>
      <Portal>
        <Drawer.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Drawer.Positioner>
          <Drawer.Content css={contentCss}>
            <Drawer.Header>
              <Drawer.Title>Editar Colaborador</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <FieldsCollaborators form={form} />
              <UploadCollaborator collaborator={collaborator} form={form} />
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="surface"
                  colorPalette="red"
                  rounded="xl"
                  onClick={() => form.reset()}
                >
                  Cancelar
                </Button>
              </Drawer.ActionTrigger>

              <Button
                size="sm"
                variant="surface"
                rounded="xl"
                colorPalette="primary"
                onClick={onSubmitUpdateCollaborator}
                loading={isPendingUpdateCollaborator}
              >
                Editar
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton
                size="xs"
                rounded="full"
                onClick={() => form.reset()}
              />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default SidebarUpdateCollaborator
