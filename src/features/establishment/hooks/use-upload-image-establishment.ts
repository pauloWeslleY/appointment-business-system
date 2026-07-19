import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { establishmentMutationOptions } from '../queries/establishment-mutation-options'
import { establishmentQueryKeys } from '../queries/establishment-query-key'
import { UploadImageEstablishmentSchema } from '../schemas/upload-image-establishment.schema'
import type { EstablishmentModel } from '../types/establishment.model'
import type { UploadImageEstablishmentForm } from '../types/upload-image-establishment.type'

export function useUploadImageEstablishment() {
  const { establishmentId } = useParams({
    from: '/_authenticated/establishment/_routes/$establishmentId/',
  })

  const queryClient = useQueryClient()

  const loadEstablishment = queryClient.getQueryData<EstablishmentModel>(
    establishmentQueryKeys.detail(establishmentId),
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
    onSuccess: () => {
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
    uploadImageEstablishment({
      id: establishmentId,
      image: data.file,
    })
  }

  return {
    errors,
    control,
    loadEstablishment,
    handleSubmit,
    onSubmitUploadImageEstablishment,
    isPendingUploadImageEstablishment,
  }
}
