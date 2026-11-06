import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { memberQueryKey } from '@/features/members/queries/member.query-key'
import { authClient } from '@/lib/auth'
import {
  type UploadFileResponse,
  uploadFileToR2,
} from '@/shared/services/storage/upload.service'

import { UpdateProfileFormSchema } from '../schemas/update-profile-form.schema'
import type { UpdateProfileFormType } from '../types/update-profile-form.type'

export function useUpdateProfile() {
  const { data: session, refetch: refreshSession } = useAppSession()
  const queryClient = useQueryClient()
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateProfileFormType>({
    resolver: zodResolver(UpdateProfileFormSchema),
    defaultValues: {
      name: session?.user?.name ?? '',
      image: null,
    },
  })

  const onSubmitUpdateProfile = async (data: UpdateProfileFormType) => {
    if (!isDirty) {
      toaster.warning({ title: 'Nenhuma alteração detectada.' })
      return
    }

    if (!session?.user?.id) {
      toaster.error({
        title: 'Usuário não autenticado. Por favor, faça login novamente.',
      })

      return
    }

    let urlImage: UploadFileResponse | undefined

    if (data.image) {
      urlImage = await uploadFileToR2({
        id: session.user.id,
        file: data.image,
        folder: 'users',
      })
    }

    try {
      await authClient.updateUser({
        name: data.name,
        image: urlImage?.key ?? null,
      })

      await refreshSession()
      await queryClient.invalidateQueries({
        queryKey: memberQueryKey.context(),
      })

      reset(data)
    } catch (error: unknown) {
      toaster.error({
        title: 'Erro ao atualizar perfil.',
        description: (error as Error).message,
      })
    }
  }

  return {
    control,
    errors,
    register,
    handleSubmit,
    isSubmitting,
    onSubmitUpdateProfile,
  }
}
