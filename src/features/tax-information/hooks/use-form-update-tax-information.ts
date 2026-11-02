import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { taxInformationMutationOptions } from '../queries/tax-information.mutation-options'
import { taxInformationSummaryQueryOptions } from '../queries/tax-information.query-options'
import { UpdateTaxInformationFormSchema } from '../schemas/update-tax-information-api.schema'
import {
  LEGAL_ENTITY_STATUSES,
  mapStatusLegalEntity,
} from '../types/tax-information-status.type'
import type { UpdateTaxInformationFormType } from '../types/update-tax-information-api.type'

export function useFormUpdateTaxInformation(
  onCloseDialogCreateTaxInformation: (open: boolean) => void,
) {
  const selectedLegalEntityId =
    sessionStorage.getItem('selected_legal_entity_id') ?? ''
  const {
    data: taxInformationSummary,
    isLoading: isLoadingTaxInformationSummary,
  } = useQuery(taxInformationSummaryQueryOptions(selectedLegalEntityId))
  const formDefaultValueUpdateTaxInformation = useMemo<
    DefaultValues<UpdateTaxInformationFormType>
  >(
    () => ({
      legalName: taxInformationSummary?.legalEntity?.legalName ?? '',
      tradeName: taxInformationSummary?.legalEntity?.tradeName ?? '',
      status: taxInformationSummary?.legalEntity?.status
        ? [taxInformationSummary.legalEntity.status]
        : [],
    }),
    [taxInformationSummary],
  )

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateTaxInformationFormType>({
    resolver: zodResolver(UpdateTaxInformationFormSchema),
    defaultValues: formDefaultValueUpdateTaxInformation,
  })
  const {
    mutate: updateTaxInformation,
    isPending: isPendingUpdateTaxInformation,
  } = useMutation(taxInformationMutationOptions.update())

  useEffect(() => {
    if (taxInformationSummary) {
      reset(formDefaultValueUpdateTaxInformation)
    }
  }, [taxInformationSummary, reset, formDefaultValueUpdateTaxInformation])

  const loadSelectStatusTaxtInformationFormSendInvite = createListCollection({
    items: Object.values(LEGAL_ENTITY_STATUSES).map((taxStatus) => ({
      label: mapStatusLegalEntity(taxStatus).label,
      value: taxStatus,
    })),
  })

  const handleDialogUpdateTaxInformation = (open: boolean) => {
    onCloseDialogCreateTaxInformation(open)
    sessionStorage.removeItem('selected_legal_entity_id')
  }

  const handleUpdateTaxInformation = handleSubmit((data) => {
    if (!isDirty) {
      toaster.warning({
        title: 'Ops! não há alterações',
        description: 'Faça alguma alteração antes de atualizar',
      })
      return
    }

    if (!selectedLegalEntityId) {
      toaster.error({
        title: 'Ops! ID da entidade legal não selecionado',
        description: 'Selecione uma entidade legal antes de atualizar',
      })
      return
    }

    updateTaxInformation(
      {
        legalEntityId: selectedLegalEntityId,
        legalName: data.legalName,
        tradeName: data.tradeName,
        status: data.status[0],
      },
      {
        onSuccess: () => {
          reset(data)
          handleDialogUpdateTaxInformation(false)

          toaster.success({
            title: 'Informações fiscais atualizadas com sucesso',
          })
        },
        onError: (error) => {
          toaster.error({
            title: 'Ops! não foi possível atualizar as informações fiscais',
            description:
              error.message || 'erro ao atualizar as informações fiscais',
          })
        },
      },
    )
  })

  return {
    handleUpdateTaxInformation,
    handleDialogUpdateTaxInformation,
    register,
    errors,
    control,
    isPendingUpdateTaxInformation,
    isLoadingTaxInformationSummary,
    loadSelectStatusTaxtInformationFormSendInvite,
  }
}
