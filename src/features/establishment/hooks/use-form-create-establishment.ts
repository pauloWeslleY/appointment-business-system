import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { toaster } from '@/components/ui/toaster'
import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'

import { establishmentMutationOptions } from '../queries/establishment-mutation-options'
import { establishmentQueryKeys } from '../queries/establishment-query-key'
import { CreateEstablishmentFormSchema } from '../schemas/establishment.schema'
type CreateEstablishmentFormData = z.infer<typeof CreateEstablishmentFormSchema>

export function useFormCreateEstablishment() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: organizationProfile } = useQuery(
    organizationProfileSummaryQueryOptions(),
  )
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEstablishmentFormData>({
    resolver: zodResolver(CreateEstablishmentFormSchema),
    defaultValues: {
      name: '',
      description: '',
      email: '',
      timezone: '',
      phones: [{ phone: '' }],
    },
  })
  const {
    mutate: createEstablishment,
    isPending: isPendingCreateEstablishment,
  } = useMutation(establishmentMutationOptions.create())

  const handleCreateEstablishment = (params: CreateEstablishmentFormData) => {
    if (!organizationProfile) {
      toaster.error({ title: 'Dados do usuário inválidos' })
      return
    }

    createEstablishment(
      {
        name: params.name,
        description: params.description,
        phones: params.phones.map((item) => item.phone),
        imageUrl: null,
        email: params.email,
        timezone: params.timezone,
      },
      {
        onSuccess: (establishment) => {
          queryClient.invalidateQueries({
            queryKey: establishmentQueryKeys.organizationProfile(
              organizationProfile?.id,
            ),
          })

          toaster.success({ title: 'Estabelecimento cadastrado' })
          reset()
          navigate({
            to: '/establishment/$establishmentSlug',
            params: { establishmentSlug: establishment.slug },
            search: { tab: 'edit' },
          })
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
    control,
    errors,
    isPendingCreateEstablishment,
    register,
    handleSubmit,
    handleCreateEstablishment,
  }
}
