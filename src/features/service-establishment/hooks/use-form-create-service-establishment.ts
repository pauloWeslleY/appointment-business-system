import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { serviceEstablishmentMutationOptions } from '../queries/service-establishment-mutation-options'
import { ServiceEstablishmentFormSchema } from '../schemas/service-establishment-form.schema'
import type {
  ServiceEstablishmentFormData,
  ServiceEstablishmentFormInput,
} from '../types/form-service-establishment.type'

export function useFormCreateServiceEstablishment() {
  const { establishmentId } = useParams({
    from: '/dashboard/$establishmentId/services/_pages/new/',
  })

  const {
    mutate: createServiceEstablishment,
    isPending: isCreatingServiceEstablishment,
  } = useMutation({
    ...serviceEstablishmentMutationOptions.create(),
    onSuccess: () => {
      toaster.success({ title: 'Serviço cadastrado com sucesso' })
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao cadastrar serviço',
        description: error.message,
      })
    },
  })

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceEstablishmentFormInput, any, ServiceEstablishmentFormData>(
    {
      resolver: zodResolver(ServiceEstablishmentFormSchema),
      defaultValues: {
        name: '',
        description: '',
        image: null,
        servicePriceInCents: 0,
      },
    },
  )

  const onSubmitCreateServiceEstablishment = (
    data: ServiceEstablishmentFormData,
  ) => {
    createServiceEstablishment(
      {
        ...data,
        establishmentId,
        servicePriceInCents: data.servicePriceInCents * 100,
      },
      {
        onSuccess: () => reset(),
      },
    )
  }

  return {
    control,
    errors,
    isCreatingServiceEstablishment,
    register,
    handleSubmit,
    onSubmitCreateServiceEstablishment,
  }
}
