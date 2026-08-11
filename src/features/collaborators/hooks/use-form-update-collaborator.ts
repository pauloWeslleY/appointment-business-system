import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { collaboratorsMutationOptions } from '../queries/collaborators-mutation-options'
import { collaboratorsQueryKeys } from '../queries/collaborators-query-key'
import { CollaboratorsSchema } from '../schemas/collaborators.schemas'
import type { CollaboratorEstablishmentModel } from '../types/collaborator-establishment.type'
import type {
  CollaboratorsFormData,
  CollaboratorsFormDataInput,
} from '../types/form-collaborators.type'

const dashboardSlugRoute = getRouteApi('/dashboard/$slug')

export function useFormUpdateCollaborator(
  collaborator: CollaboratorEstablishmentModel,
) {
  const queryClient = useQueryClient()
  const establishment = dashboardSlugRoute.useLoaderData()

  const formDefaultValues = useMemo<DefaultValues<CollaboratorsFormDataInput>>(
    () => ({
      name: collaborator.name,
      email: collaborator.email,
      cellphone: collaborator.cellphone,
      document: collaborator.document ?? undefined,
      specialty: collaborator.specialty,
      workSchedule: collaborator.workSchedule,
      image: collaborator.imageUrl,
    }),
    [collaborator],
  )

  const form = useForm<CollaboratorsFormDataInput, any, CollaboratorsFormData>({
    resolver: zodResolver(CollaboratorsSchema),
    defaultValues: formDefaultValues,
  })

  const {
    mutate: updateCollaborators,
    isPending: isPendingUpdateCollaborator,
  } = useMutation({
    ...collaboratorsMutationOptions.update(),
    onSuccess: (updatedCollaborator, variables) => {
      queryClient.setQueryData<CollaboratorEstablishmentModel[]>(
        collaboratorsQueryKeys.establishment(variables.establishmentId),
        (oldData) => {
          const loadedCollaborators = oldData ?? []

          const newCollaboratorData: CollaboratorEstablishmentModel = {
            id: updatedCollaborator.id,
            name: updatedCollaborator.name,
            email: updatedCollaborator.email,
            cellphone: updatedCollaborator.cellphone,
            document: updatedCollaborator.document,
            specialty: updatedCollaborator.specialty,
            imageUrl: updatedCollaborator.imageUrl,
            status: updatedCollaborator.status,
            workSchedule: updatedCollaborator.workSchedule,
            createdAt: updatedCollaborator.createdAt,
            updatedAt: updatedCollaborator.updatedAt,
          }

          return loadedCollaborators.map((collaborator) =>
            collaborator.id === newCollaboratorData.id
              ? { ...newCollaboratorData }
              : collaborator,
          )
        },
      )

      toaster.success({ title: 'Colaborador atualizado com sucesso' })
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao atualizar colaborador',
        description: error.message,
      })
    },
  })

  const onSubmitUpdateCollaborator = form.handleSubmit((data) => {
    if (!establishment?.id) {
      toaster.error({
        title: 'Erro ao cadastrar colaborador',
        description: 'ID do estabelecimento não encontrado',
      })
      return
    }

    if (!form.formState.isDirty) {
      toaster.error({
        title: 'Atualize o formulário',
        description: 'Nenhuma alteração foi feita',
      })
      return
    }

    updateCollaborators(
      {
        id: collaborator.id,
        name: data.name,
        email: data.email,
        cellphone: data.cellphone,
        document: data.document ?? null,
        specialty: data.specialty,
        workSchedule: data.workSchedule,
        image: data.image ?? null,
        establishmentId: establishment.id,
      },
      {
        onSuccess: () => form.reset(),
      },
    )
  })

  return {
    form,
    onSubmitUpdateCollaborator,
    isPendingUpdateCollaborator,
  }
}
