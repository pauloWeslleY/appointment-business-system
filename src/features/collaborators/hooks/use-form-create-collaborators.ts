import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

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

export function useFormCreateCollaborators() {
  const queryClient = useQueryClient()
  const establishment = dashboardSlugRoute.useLoaderData()

  const form = useForm<CollaboratorsFormDataInput, any, CollaboratorsFormData>({
    resolver: zodResolver(CollaboratorsSchema),
    defaultValues: {
      name: '',
      email: '',
      cellphone: '',
      document: '',
      specialty: '',
      workSchedule: '',
      image: null,
    },
  })

  const {
    mutate: createCollaborators,
    isPending: isPendingCreateCollaborators,
  } = useMutation({
    ...collaboratorsMutationOptions.create(),
    onSuccess: (newCollaborator, variables) => {
      queryClient.setQueryData<CollaboratorEstablishmentModel[]>(
        collaboratorsQueryKeys.establishment(variables.establishmentId),
        (oldData) => {
          const newCollaboratorData: CollaboratorEstablishmentModel = {
            id: newCollaborator.id,
            name: newCollaborator.name,
            email: newCollaborator.email,
            cellphone: newCollaborator.cellphone,
            document: newCollaborator.document,
            specialty: newCollaborator.specialty,
            imageUrl: newCollaborator.imageUrl,
            status: newCollaborator.status,
            workSchedule: newCollaborator.workSchedule,
            createdAt: newCollaborator.createdAt,
            updatedAt: newCollaborator.updatedAt,
          }

          return oldData
            ? [...oldData, newCollaboratorData]
            : [newCollaboratorData]
        },
      )

      toaster.success({ title: 'Colaborador cadastrado com sucesso' })
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao cadastrar colaborador',
        description: error.message,
      })
    },
  })

  const onSubmitCreateCollaborators = form.handleSubmit((data) => {
    if (!establishment?.id) {
      toaster.error({
        title: 'Erro ao cadastrar colaborador',
        description: 'ID do estabelecimento não encontrado',
      })
      return
    }

    createCollaborators(
      { ...data, establishmentId: establishment.id },
      {
        onSuccess: () => form.reset(),
      },
    )
  })

  return {
    form,
    onSubmitCreateCollaborators,
    isPendingCreateCollaborators,
  }
}
