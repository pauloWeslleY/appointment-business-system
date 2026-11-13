import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { memberQueryKey } from '@/features/members/queries/member.query-key'
import { authClient } from '@/lib/auth'
import { uploadFileToR2 } from '@/shared/services/storage/upload.service'

import { UploadPhotoProfileFormSchema } from '../schemas/update-profile-form.schema'
import type { UploadPhotoProfileFormDataType } from '../types/update-profile-form.type'

export function useUploadPhotoProfile() {
  const { data: session, refetch: refreshSession } = useAppSession()
  const queryClient = useQueryClient()
  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UploadPhotoProfileFormDataType>({
    resolver: zodResolver(UploadPhotoProfileFormSchema),
    defaultValues: { image: null },
  })

  function handleClearErrorsUploadPhotoProfile() {
    clearErrors('image')
  }

  const onSubmitUploadPhotoProfile = async (
    data: UploadPhotoProfileFormDataType,
  ) => {
    if (!isDirty) {
      toaster.warning({
        title: 'Nenhuma alteração detectada.',
        description: 'Por favor, selecione uma nova imagem antes de enviar.',
      })
      return
    }

    if (!session?.user?.id) {
      toaster.error({
        title: 'Usuário não autenticado.',
        description: 'Por favor, faça login novamente.',
      })
      return
    }

    if (!data.image) {
      toaster.warning({ title: 'Nenhuma imagem selecionada.' })
      setError('image', {
        type: 'manual',
        message: 'Nenhuma imagem selecionada.',
      })
      return
    }

    try {
      const urlImage = await uploadFileToR2({
        id: session.user.id,
        file: data.image,
        folder: 'users',
      })

      await authClient.updateUser({ image: urlImage.key ?? null })
      await refreshSession()
      await queryClient.invalidateQueries({
        queryKey: memberQueryKey.context(),
      })

      reset({ image: null })
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
    isSubmitting,
    onSubmitUploadPhotoProfile,
    handleSubmit,
    handleClearErrorsUploadPhotoProfile,
  }
}
