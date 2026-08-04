import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { UpdateOwnerFormSchema } from '@/features/owner/schemas/update-owner-form.schema'
import type { UpdateOwnerFormData } from '@/features/owner/types/owner-form-data.type'
import { authClient } from '@/lib/auth'

import { ownerMutationOptions } from '../queries/owner-mutation-options'
import { ownerQueryKeys } from '../queries/owner-query-key'
import type { OwnerModel } from '../types/owner.model'

export function useFormUpdateOwner() {
  const { data: session } = authClient.useSession()
  const queryClient = useQueryClient()
  const owner = queryClient.getQueryData<OwnerModel>(
    ownerQueryKeys.user(session?.user?.id),
  )

  const { mutate: updateOwner, isPending: isPendingUpdateOwner } = useMutation({
    ...ownerMutationOptions.update(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ownerQueryKeys.user(data.userId),
      })

      toaster.success({ title: 'Proprietário atualizado com sucesso' })
    },
    onError: (error) => {
      toaster.error({
        title: error.message || 'Erro ao atualizar proprietário',
      })
    },
  })

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateOwnerFormData>({
    resolver: zodResolver(UpdateOwnerFormSchema),
    defaultValues: {
      name: owner?.name ?? '',
      phone: owner?.phone ?? '',
    },
  })

  const handleUpdateOwner = (data: UpdateOwnerFormData) => {
    if (!owner) {
      toaster.error({ title: 'Proprietário não encontrado' })
      return
    }

    if (!isDirty) {
      toaster.error({ title: 'Nenhuma alteração detectada' })
      return
    }

    updateOwner(
      { ...data, id: owner.id },
      {
        onSuccess: () => reset(data),
      },
    )
  }

  return {
    errors,
    control,
    register,
    handleSubmit,
    isPendingUpdateOwner,
    handleUpdateOwner,
  }
}
