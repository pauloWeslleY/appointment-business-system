import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { CreateOwnerFormSchema } from '@/features/owner/schemas/create-owner-form.schema'
import { type CreateOwnerFormData } from '@/features/owner/types/owner-form-data.type'
import { authClient } from '@/lib/auth'

import { ownerMutationOptions } from '../queries/owner-mutation-options'
import { ownerQueryKeys } from '../queries/owner-query-key'

export function useFormCreateOwner() {
  const { data } = authClient.useSession()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: createOwner, isPending: isPendingCreateOwner } = useMutation({
    ...ownerMutationOptions.create(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ownerQueryKeys.user(data.userId),
      })

      toaster.success({ title: 'Proprietário criado com sucesso' })
      navigate({ to: '/establishment' })
    },
    onError: (error) => {
      toaster.error({
        title: error.message || 'Erro ao criar proprietário',
      })
    },
  })

  const formDefaultValues = useMemo<DefaultValues<CreateOwnerFormData>>(
    () => ({
      name: data?.user?.name || '',
      email: data?.user?.email || '',
      cnpj: '',
      phone: '',
      businessName: '',
    }),
    [data],
  )

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOwnerFormData>({
    resolver: zodResolver(CreateOwnerFormSchema),
    defaultValues: formDefaultValues,
  })

  const handleCreateOwner = (params: CreateOwnerFormData) => {
    if (!data || !data.user?.id) {
      toaster.error({ title: 'Dados do usuário inválidos' })
      return
    }

    createOwner(
      { ...params, userId: data.user.id },
      {
        onSuccess: () => reset(),
      },
    )
  }

  return {
    control,
    reset,
    register,
    handleSubmit,
    errors,
    isPendingCreateOwner,
    handleCreateOwner,
  }
}
