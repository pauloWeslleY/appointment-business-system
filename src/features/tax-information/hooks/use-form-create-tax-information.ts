import { createListCollection } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { organizationProfileQueryKeys } from '@/features/organization-profile/queries/organization-profile-query-key'
import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'
import { getCnpjInformation } from '@/shared/services/api-cnpj/cnpj.service'
import type { CompanyLookupResponse } from '@/shared/types/cpnj-api.response.type'
import { FormatMask } from '@/shared/utils/formatted-mask'

import { taxInformationMutationOptions } from '../queries/tax-information.mutation-options'
import { taxInformationQueryKeys } from '../queries/tax-information.query-key'
import { CreateTaxInformationFormSchema } from '../schemas/create-tax-information-api.schema'
import type { CreateTaxInformationFormType } from '../types/create-tax-information-api.type'
import { TAX_ID_TYPES, type TaxIdType } from '../types/tax-id.type'

export const loadSelectTaxtInformationFormSendInvite = createListCollection({
  items: Object.values(TAX_ID_TYPES).map((tax) => ({
    label: tax,
    value: tax,
  })),
})

export function useFormCreateTaxInformation() {
  const [
    isOpenDialogCreateTaxInformation,
    setIsOpenDialogCreateTaxInformation,
  ] = useQueryState('is_open', parseAsBoolean.withDefault(false))
  const queryClient = useQueryClient()
  const isFetchingOrganizationProfile = useIsFetching({
    queryKey: organizationProfileQueryKeys.summary(),
  })
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<CreateTaxInformationFormType>({
    resolver: zodResolver(CreateTaxInformationFormSchema),
    defaultValues: {
      legalName: '',
      tradeName: '',
      taxIdType: [TAX_ID_TYPES.CNPJ],
      taxId: '',
    },
  })
  const {
    isPending: isPendingCreateTaxInformation,
    mutate: createTaxInformation,
  } = useMutation(taxInformationMutationOptions.create())
  const [inputTaxIdType, inputTaxId] = useWatch({
    control,
    name: ['taxIdType', 'taxId'],
  })

  const cnpjInformation = queryClient.getQueryData<CompanyLookupResponse>([
    'cnpj',
    inputTaxId,
  ])
  const isFetchingVerificationCnpj = useIsFetching({
    queryKey: ['cnpj', inputTaxId],
  })

  const isValidCNPJ = inputTaxIdType[0] === TAX_ID_TYPES.CNPJ
  const isLoadingOrganizationProfile = isFetchingOrganizationProfile > 0
  const formattedTaxId: Record<
    TaxIdType,
    { mask: string; placeHolder: string; label: string }
  > = {
    [TAX_ID_TYPES.CPF]: {
      label: 'CPF',
      mask: FormatMask.PERSONAL_TAX_ID,
      placeHolder: '000.000.000-00',
    },
    [TAX_ID_TYPES.CNPJ]: {
      label: 'CNPJ',
      mask: FormatMask.COMPANY_TAX_ID,
      placeHolder: '00.000.000/0000-00',
    },
  }
  const taxIdMaskSelected = formattedTaxId[inputTaxIdType[0]] ?? {
    label: 'CPF/CNPJ',
    placeHolder: 'Informe o CPF/CNPJ',
    mask: '',
  }

  const taxInformationVerify = {
    title: 'Verificação do CNPJ',
    description: cnpjInformation ? 'CNPJ válido' : 'CNPJ não verificado',
    status: cnpjInformation ? 'success' : 'warning',
  }

  const handleDialogCreateTaxInformation = (isOpen: boolean) => {
    setIsOpenDialogCreateTaxInformation(isOpen)
  }

  const onChangeClearTaxIdCreateTaxInformation = (taxIdType: string[]) => {
    if (taxIdType.length === 0) {
      return
    }

    clearErrors('taxId')
    setValue('taxId', '', {
      shouldTouch: true,
    })
  }

  const handleVerifyCnpjCreateTaxInformation = async () => {
    if (!isValidCNPJ) {
      return
    }

    if (inputTaxId.trim() === '') {
      toaster.error({
        title: 'Ops! CNPJ não informado',
        description: 'Por favor, informe o CNPJ para verificação',
      })
      return
    }

    try {
      const cnpjResponse = await queryClient.query({
        queryKey: ['cnpj', inputTaxId],
        queryFn: () => getCnpjInformation(inputTaxId),
      })

      if (cnpjResponse.status === 'OK') {
        toaster.success({
          title: 'CNPJ válido',
          description: 'Informações da CNPJ encontradas com sucesso',
        })
        return
      }
    } catch (error: unknown) {
      toaster.error({
        title: 'Ops! Erro ao verificar CNPJ',
        description:
          (error as Error).message || 'Não foi possível verificar o CNPJ',
      })
    }
  }

  const updateInputsTradeNameAndLegalName = (inputs: [string, string][]) => {
    for (const [key, value] of inputs) {
      setValue(key as keyof CreateTaxInformationFormType, value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }

  const handleUpdateInputsTradeNameAndLegalNameWithTaxInformation = () => {
    const inputs = Object.entries({
      legalName: cnpjInformation?.nome || '',
      tradeName: cnpjInformation?.fantasia || '',
    })

    updateInputsTradeNameAndLegalName(inputs)
  }

  const handleUpdateInputsTradeNameAndLegalName = async () => {
    const organizationProfile = await queryClient.query(
      organizationProfileSummaryQueryOptions(),
    )

    const inputs = Object.entries({
      legalName: organizationProfile.legalName || '',
      tradeName: organizationProfile.tradeName || '',
    })

    updateInputsTradeNameAndLegalName(inputs)
  }

  const handleCreateTaxInformation = handleSubmit((data) => {
    if (!cnpjInformation) {
      toaster.error({
        title: 'Ops! CNPJ não foi valido',
        description: 'Informações da CNPJ não encontradas',
      })
      return
    }

    createTaxInformation(
      {
        legalName: data.legalName,
        tradeName: data.tradeName,
        taxId: data.taxId,
        taxIdType: data.taxIdType[0],
      },
      {
        onSuccess: async (_data, _variables, _result, context) => {
          reset()
          handleDialogCreateTaxInformation(false)

          await context.client.invalidateQueries({
            queryKey: taxInformationQueryKeys.list({}),
          })
          toaster.success({
            title: 'Informações fiscais criadas com sucesso',
          })
        },
        onError: (error) => {
          toaster.error({
            title: 'Ops! não foi possível criar as informações fiscais',
            description:
              error.message || 'erro ao cadastrar as informações fiscais',
          })
        },
      },
    )
  })

  return {
    onChangeClearTaxIdCreateTaxInformation,
    handleVerifyCnpjCreateTaxInformation,
    handleUpdateInputsTradeNameAndLegalName,
    handleDialogCreateTaxInformation,
    handleCreateTaxInformation,
    handleUpdateInputsTradeNameAndLegalNameWithTaxInformation,
    register,
    errors,
    control,
    taxInformationVerify,
    taxIdMaskSelected,
    isValidCNPJ,
    isFetchingVerificationCnpj,
    isLoadingOrganizationProfile,
    isPendingCreateTaxInformation,
    isOpenDialogCreateTaxInformation,
  }
}
