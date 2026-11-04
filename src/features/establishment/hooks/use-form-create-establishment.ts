import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'

import { storageEstablishment } from '../helpers/storage-establishment'
import { establishmentMutationOptions } from '../queries/establishment.mutation-options'
import { CreateEstablishmentFormDataSchema } from '../schemas/establishment-form.schema'
import type { CreateEstablishmentFormData as CreateEstablishmentFormData } from '../types/establishment-form-data.type'
import { useStepCreateEstablishment } from './use-step-create-establishment'

export function useFormCreateEstablishment() {
  const { nextStepCreateEstablishment } = useStepCreateEstablishment()
  const { data: organizationProfile } = useQuery(
    organizationProfileSummaryQueryOptions(),
  )
  const formCreateEstablishment = useForm<CreateEstablishmentFormData>({
    resolver: zodResolver(CreateEstablishmentFormDataSchema),
    defaultValues: {
      name: '',
      description: '',
      email: '',
      timezone: 'America/Sao_Paulo',
      phones: [{ phone: '', type: 'telephone' }],
    },
  })
  const {
    mutate: createEstablishment,
    isPending: isPendingCreateEstablishment,
  } = useMutation(establishmentMutationOptions.create())

  const handleCreateEstablishment = (data: CreateEstablishmentFormData) => {
    if (!organizationProfile) {
      toaster.error({ title: 'Dados do usuário inválidos' })
      return
    }

    createEstablishment(
      {
        name: data.name,
        description: data.description,
        phones: data.phones.map((item) => item.phone),
        imageUrl: null,
        email: data.email,
        timezone: data.timezone,
      },
      {
        onSuccess: (establishment) => {
          formCreateEstablishment.reset()
          toaster.success({ title: 'Estabelecimento cadastrado' })
          storageEstablishment.set({
            id: establishment.id,
            slug: establishment.slug,
            created: true,
          })
          nextStepCreateEstablishment()
        },
        onError: (error) => {
          toaster.error({
            title: error.message || 'Erro ao criar estabelecimento',
          })
        },
      },
    )
  }

  return {
    formCreateEstablishment,
    isPendingCreateEstablishment,
    handleCreateEstablishment,
  }
}
