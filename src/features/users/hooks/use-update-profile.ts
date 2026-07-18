import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth'
import {
  type UploadFileResponse,
  uploadFileToR2,
} from '@/shared/services/storage/upload.service'

import { UpdateProfileFormSchema } from '../schemas/update-profile-form.schema'
import type { UpdateProfileFormType } from '../types/update-profile-form.type'

export function useUpdateProfile() {
  const { data: session } = authClient.useSession()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormType>({
    resolver: zodResolver(UpdateProfileFormSchema),
    defaultValues: {
      name: session?.user?.name ?? '',
      image: null,
    },
  })

  console.log('[ERROR] => ', errors)

  const onSubmitUpdateProfile = async (data: UpdateProfileFormType) => {
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
