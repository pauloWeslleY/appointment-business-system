import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'

import { toaster } from '@/components/ui/toaster'
import { contentCss } from '@/theme/styles/global-styles'

import { collaboratorsMutationOptions } from '../queries/collaborators-mutation-options'
import { collaboratorsQueryKeys } from '../queries/collaborators-query-key'
import type { CollaboratorEstablishmentModel } from '../types/collaborator-establishment.type'

interface DialogInactiveCollaboratorProps {
  collaborator: CollaboratorEstablishmentModel
  open: boolean
  onOpen: (open: boolean) => void
}

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

const DialogInactiveCollaborator = ({
  collaborator,
  open,
  onOpen,
}: DialogInactiveCollaboratorProps) => {
  const queryClient = useQueryClient()
  const establishment = dashboardSlugRoute.useLoaderData()

  const {
    mutate: mutateInactiveCollaborator,
    isPending: isPendingInactiveCollaborator,
  } = useMutation({
    ...collaboratorsMutationOptions.inactive(),
    onSuccess: (inactivedCollaborator, variables) => {
      queryClient.setQueryData<CollaboratorEstablishmentModel[]>(
        collaboratorsQueryKeys.establishment(variables.establishmentId),
        (listCollaboratorsCache) => {
          if (!listCollaboratorsCache) return []

          return listCollaboratorsCache.map((collaborator) => {
            if (collaborator.id === inactivedCollaborator.id) {
              return {
                id: inactivedCollaborator.id,
                name: inactivedCollaborator.name,
                email: inactivedCollaborator.email,
                cellphone: inactivedCollaborator.cellphone,
                document: inactivedCollaborator.document,
                specialty: inactivedCollaborator.specialty,
                imageUrl: inactivedCollaborator.imageUrl,
                status: inactivedCollaborator.status,
                workSchedule: inactivedCollaborator.workSchedule,
                createdAt: inactivedCollaborator.createdAt,
                updatedAt: inactivedCollaborator.updatedAt,
              }
            }
            return collaborator
          })
        },
      )
      toaster.success({ title: 'Colaborador inativado com sucesso!' })
      onOpen(false)
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao inativar colaborador',
        description: error.message,
      })
    },
  })

  const handleInactiveCollaborator = () => {
    mutateInactiveCollaborator({
      collaboratorId: collaborator.id,
      establishmentId: establishment.id,
    })
  }

  return (
    <Dialog.Root
      role="alertdialog"
      motionPreset="slide-in-bottom"
      placement="center"
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.300" />
        <Dialog.Positioner>
          <Dialog.Content css={contentCss}>
            <Dialog.Header>
              <Dialog.Title>Inativar colaborador</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Tem certeza de que deseja inativar o colaborador "
                <strong>{collaborator.name}</strong>"? Esta ação não pode ser
                desfeita.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button size="sm" variant="surface" rounded="xl">
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                size="sm"
                variant="surface"
                rounded="xl"
                colorPalette="red"
                loading={isPendingInactiveCollaborator}
                onClick={handleInactiveCollaborator}
              >
                Inativar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" rounded="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DialogInactiveCollaborator
