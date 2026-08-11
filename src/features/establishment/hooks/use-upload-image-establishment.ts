import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { establishmentMutationOptions } from '../queries/establishment-mutation-options'
import { establishmentQueryKeys } from '../queries/establishment-query-key'
import { UploadImageEstablishmentSchema } from '../schemas/upload-image-establishment.schema'
import type { EstablishmentSlugModel } from '../types/establishment.model'
import type { UploadImageEstablishmentForm } from '../types/upload-image-establishment.type'

export function useUploadImageEstablishment() {
  const { establishmentSlug } = useParams({
    from: '/_authenticated/establishment/_routes/$establishmentSlug/',
  })

  const queryClient = useQueryClient()

  const getEstablishment = queryClient.getQueryData<EstablishmentSlugModel>(
    establishmentQueryKeys.slug(establishmentSlug),
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
    if (!getEstablishment) {
      toaster.error({
        title: 'Estabelecimento não encontrado!',
        description: 'Ocorreu um erro ao enviar a imagem.',
      })
      return
    }

    uploadImageEstablishment({
      id: getEstablishment?.id,
      image: data.file,
    })
  }

  return {
    errors,
    control,
    getEstablishment,
    handleSubmit,
    onSubmitUploadImageEstablishment,
    isPendingUploadImageEstablishment,
  }
}
