import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { CreateOwnerFormSchema } from '@/features/owner/schemas/create-owner-form.schema'
import { type CreateOwnerFormData } from '@/features/owner/types/owner-form-data.type'
import { authClient } from '@/lib/auth'

import { ownerMutationOptions } from '../queries/owner-mutation-options'
import { ownerQueryKeys } from '../queries/owner-query-key'

export function useFormCreateOwner(
  setStepRegisterWithValidation: (step: number) => void,
) {
  const { data } = authClient.useSession()
  const queryClient = useQueryClient()

  const {
    mutate: createOwner,
    isPending: isPendingCreateOwner,
    isSuccess: isSuccessCreateOwner,
    data: dataCreateOwnerResponse,
  } = useMutation({
    ...ownerMutationOptions.create(),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ownerQueryKeys.user(data.userId),
      })

      toaster.success({ title: 'Proprietário criado com sucesso' })
      setStepRegisterWithValidation(2)
    },
    onError: (error) => {
      toaster.error({
        title: error.message || 'Erro ao criar proprietário',
      })
    },
  })

  const formDefaultValues = useMemo<DefaultValues<CreateOwnerFormData>>(
    () => ({
      name: data?.user?.name || '',
      email: data?.user?.email || '',
      cnpj: '',
      phone: '',
    }),
    [data],
  )

  const {
    control,
    reset,
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOwnerFormData>({
    resolver: zodResolver(CreateOwnerFormSchema),
    defaultValues: formDefaultValues,
  })
  const dataCreateOwner = getValues()

  const handleGoBackToPreviousStep = () => {
    const isValidFormCreateOwner = Object.values(dataCreateOwner).some(
      (value) => value === '' || value === undefined,
    )

    if (isValidFormCreateOwner) {
      toaster.warning({
        title: 'Atenção',
        description:
          'Existem campos obrigatórios que não foram preenchidos. Por favor, preencha todos os campos antes de prosseguir.',
      })

      for (const [key, value] of Object.entries(dataCreateOwner)) {
        if (value === '' || value === undefined) {
          setError(key as keyof CreateOwnerFormData, {
            type: 'manual',
            message: 'Campo obrigatório',
          })
        }
      }

      return
    }

    setStepRegisterWithValidation(0)
  }

  const handleGoBackToNextStep = () => {
    if (!isSuccessCreateOwner || !dataCreateOwnerResponse) {
      toaster.error({
        title: 'Ops! Não foi possível prosseguir.',
        description:
          'Ainda existem campos obrigatórios que não foram preenchidos.',
      })

      return
    }
    setStepRegisterWithValidation(2)
  }

  const handleCreateOwner = (params: CreateOwnerFormData) => {
    if (!data || !data.user?.id) {
      toaster.error({ title: 'Dados do usuário inválidos' })
      return
    }

    createOwner(
      { ...params, userId: data.user.id },
      {
        onSuccess: () => reset(),
      },
    )
  }

  return {
    control,
    reset,
    register,
    handleSubmit,
    errors,
    isPendingCreateOwner,
    handleCreateOwner,
    handleGoBackToPreviousStep,
    handleGoBackToNextStep,
  }
}
