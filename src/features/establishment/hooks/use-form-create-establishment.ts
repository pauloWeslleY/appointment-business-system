import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useFieldArray, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { toaster } from '@/components/ui/toaster'
import { useGetOwnerById } from '@/features/organization-profile/hooks/use-get-owner-by-id'

import { establishmentMutationOptions } from '../queries/establishment-mutation-options'
import { establishmentQueryKeys } from '../queries/establishment-query-key'
import { CreateEstablishmentFormSchema } from '../schemas/establishment.schema'
type CreateEstablishmentFormData = z.infer<typeof CreateEstablishmentFormSchema>

export function useFormCreateEstablishment() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: owner } = useGetOwnerById()

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
      phones: [{ phone: '' }],
    },
  })

  const {
    mutate: createEstablishment,
    isPending: isPendingCreateEstablishment,
  } = useMutation({
    ...establishmentMutationOptions.create(),
    onSuccess: (establishment) => {
      queryClient.invalidateQueries({
        queryKey: establishmentQueryKeys.owner(owner?.id),
      })

      toaster.success({ title: 'Estabelecimento criado com sucesso' })
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
  })

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: 'phones' })

  const handleCreateEstablishment = (params: CreateEstablishmentFormData) => {
    if (!owner) {
      toaster.error({ title: 'Dados do usuário inválidos' })
      return
    }

    createEstablishment({
      name: params.name,
      description: params.description,
      phones: params.phones.map((item) => item.phone),
      imageUrl: null,
    })
  }

  return {
    control,
    register,
    handleSubmit,
    errors,
    isPendingCreateEstablishment,
    handleCreateEstablishment,
    phoneFields,
    appendPhone,
    removePhone,
  }
}
