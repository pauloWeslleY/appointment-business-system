import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { establishmentMutationOptions } from '../queries/establishment.mutation-options'
import { establishmentQueryKeys } from '../queries/establishment.query-key'
import { UploadImageEstablishmentSchema } from '../schemas/upload-image-establishment.schema'
import type { EstablishmentSlugApiResponse } from '../types/get-establishment-api.response.type'
import type { UploadImageEstablishmentForm } from '../types/upload-image-establishment.type'

export function useUploadImageEstablishment(establishmentSlug: string) {
  const queryClient = useQueryClient()
  const establishment = queryClient.getQueryData<EstablishmentSlugApiResponse>(
    establishmentQueryKeys.adminSlug(establishmentSlug),
  )

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadImageEstablishmentForm>({
    resolver: zodResolver(UploadImageEstablishmentSchema),
    defaultValues: {
      file: undefined,
    },
  })

  const {
    mutate: uploadImageEstablishment,
    isPending: isPendingUploadImageEstablishment,
  } = useMutation({
    ...establishmentMutationOptions.uploadImage(),
    onSuccess: async (...args) => {
      await establishmentMutationOptions.uploadImage().onSuccess?.(...args)
      reset()
      toaster.success({ title: 'Imagem enviada com sucesso!' })
    },
    onError: (error) => {
      toaster.error({
        title: 'Falha ao enviar imagem!',
        description: error.message || 'Ocorreu um erro ao enviar a imagem.',
      })
    },
  })

  const onSubmitUploadImageEstablishment = (
    data: UploadImageEstablishmentForm,
  ) => {
    if (!establishment) {
      toaster.error({
        title: 'Estabelecimento não encontrado!',
        description: 'Ocorreu um erro ao enviar a imagem.',
      })

      return
    }

    uploadImageEstablishment({
      id: establishment.id,
      image: data.file,
    })
  }

  return {
    errors,
    control,
    establishment,
    handleSubmit,
    onSubmitUploadImageEstablishment,
    isPendingUploadImageEstablishment,
  }
}
