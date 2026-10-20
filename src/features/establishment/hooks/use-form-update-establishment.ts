import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { toaster } from '@/components/ui/toaster'

import { establishmentMutationOptions } from '../queries/establishment-mutation-options'
import { establishmentQueryKeys } from '../queries/establishment-query-key'
import { establishmentSlugQueryOptions } from '../queries/establishment-query-options'
import { CreateEstablishmentFormSchema } from '../schemas/establishment.schema'

type FormData = z.infer<typeof CreateEstablishmentFormSchema>

export function useFormUpdateEstablishment() {
  const { establishmentSlug } = useParams({
    from: '/_authenticated/establishment/_routes/$establishmentSlug/',
  })
  const queryClient = useQueryClient()
  const {
    data: establishment,
    isLoading: isLoadingEstablishment,
    error: errorEstablishment,
  } = useQuery(establishmentSlugQueryOptions(establishmentSlug))
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(CreateEstablishmentFormSchema),
    defaultValues: { name: '', description: '', phones: [{ phone: '' }] },
  })

  useEffect(() => {
    if (establishment) {
      reset({
        name: establishment.name,
        description: establishment.description,
        phones: establishment.phones.map((phone) => ({ phone })),
      })
    }
  }, [establishment, reset])

  const {
    mutate: updateEstablishment,
    isPending: isPendingUpdateEstablishment,
  } = useMutation({
    ...establishmentMutationOptions.update(),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({
        queryKey: establishmentQueryKeys.owner(updated.ownerId),
      })
      queryClient.invalidateQueries({
        queryKey: establishmentQueryKeys.slug(establishmentSlug),
      })
      toaster.success({ title: 'Estabelecimento atualizado com sucesso' })
    },
    onError: (error) =>
      toaster.error({
        title: error.message || 'Erro ao atualizar estabelecimento',
      }),
  })

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: 'phones' })

  const handleUpdateEstablishment = (params: FormData) => {
    if (!isDirty) {
      toaster.warning({ title: 'Nenhuma alteração foi feita' })
      return
    }

    if (!establishment) {
      toaster.error({ title: 'Estabelecimento indisponível' })
      return
    }

    updateEstablishment({
      id: establishment.id,
      name: params.name,
      description: params.description,
      phones: params.phones.map((item) => item.phone),
    })
  }

  return {
    register,
    handleSubmit,
    errors,
    isPendingUpdateEstablishment,
    isLoadingEstablishment,
    errorEstablishment,
    handleUpdateEstablishment,
    phoneFields,
    appendPhone,
    removePhone,
  }
}
