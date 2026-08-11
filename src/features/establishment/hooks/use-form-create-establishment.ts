import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { useGetOwnerById } from '@/features/owner/hooks/use-get-owner-by-id'
import { onBlurZipCode } from '@/shared/services/via-cep/onblur-zip-code'

import { establishmentMutationOptions } from '../queries/establishment-mutation-options'
import { establishmentQueryKeys } from '../queries/establishment-query-key'
import { EstablishmentFormSchema } from '../schemas/establishment.schema'
import type { EstablishmentFormData } from '../types/establishment-form-data.type'

export function useFormCreateEstablishment() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: owner } = useGetOwnerById()

  const {
    control,
    reset,
    register,
    getValues,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<EstablishmentFormData>({
    resolver: zodResolver(EstablishmentFormSchema),
    defaultValues: {
      name: '',
      description: '',
      weekdays: ['0'],
      intervals: [{ open: '', close: '' }],
      phones: [{ phone: '' }],
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        complement: '',
      },
    },
  })

  const {
    mutate: createEstablishment,
    isPending: isPendingCreateEstablishment,
  } = useMutation({
    ...establishmentMutationOptions.create(),
    onSuccess: (establishment) => {
      queryClient.invalidateQueries({
        queryKey: establishmentQueryKeys.owner(owner?.id),
      })

      toaster.success({ title: 'Estabelecimento criado com sucesso' })
      reset()
      navigate({
        to: '/establishment/$establishmentSlug',
        params: { establishmentSlug: establishment.slug },
        search: { tab: 'edit' },
      })
    },
    onError: (error) => {
      toaster.error({
        title: error.message || 'Erro ao criar estabelecimento',
      })
    },
  })

  const handleCloseAlertCreatePhone = () => clearErrors('phones')
  const handleCloseAlertCreateIntervals = () => clearErrors('intervals')

  const onBlurZipCodeCreateEstablishment = async (zipCode: string) => {
    const response = await onBlurZipCode(zipCode)
    if (!response) return

    const addressFields = Object.entries({
      zipCode: response.cep,
      complement: response.complemento,
      street: response.logradouro,
      neighborhood: response.bairro,
      city: response.localidade,
      state: response.uf,
      number: getValues().address.number || '',
    })

    for (const [key, value] of addressFields) {
      setValue(`address.${key}` as keyof EstablishmentFormData, value)
    }
  }

  const handleCreateEstablishment = (params: EstablishmentFormData) => {
    if (!owner) {
      toaster.error({ title: 'Dados do usuário inválidos' })
      return
    }

    if (!params.intervals.some(Boolean)) {
      toaster.error({
        title: 'Todos os horários devem estar preenchidos',
        description:
          'Preencha todos os horários de abertura e fechamento para cada dia selecionado',
      })
      return
    }

    createEstablishment({
      name: params.name,
      description: params.description,
      ownerId: owner.id,
      phones: params.phones.map((item) => item.phone),
      openingHours: params.weekdays.map((day, index) => ({
        day: parseInt(day, 10),
        intervals: [params.intervals[index]],
      })),
      address: params.address,
      imageUrl: null,
    })
  }

  return {
    control,
    getValues,
    register,
    handleSubmit,
    errors,
    isPendingCreateEstablishment,
    handleCreateEstablishment,
    handleCloseAlertCreatePhone,
    handleCloseAlertCreateIntervals,
    onBlurZipCodeCreateEstablishment,
  }
}
