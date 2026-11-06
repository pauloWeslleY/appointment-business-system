import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import type { GetMeContextResponse } from '@/features/members/types/member-response.type'

import { EstablishmentColorsFormSchema } from '../schemas/establishment-colors-form.schema'
import type { EstablishmentColorsForm } from '../types/establishment-colors-form.type'
import { getEstablishmentColorsFormValues } from '../utils/establishment-colors-form-values'
import {
  useEstablishmentSettings,
  useSaveEstablishmentSettings,
  useSyncEstablishmentSettingsForm,
} from './use-establishment-settings'

export function useFormEstablishmentColors(
  establishmentSlug: string,
  memberContext: GetMeContextResponse,
) {
  const {
    establishmentSettingsScope,
    establishmentSettingsScopeIdentity,
    establishmentSettingsQuery: establishmentColorsQuery,
    canUpdateEstablishmentSettings: canUpdateEstablishmentColors,
    isCurrentEstablishmentSettingsScope,
    resolveEstablishmentIdToSave,
  } = useEstablishmentSettings(establishmentSlug, memberContext)

  const formEstablishmentColors = useForm<EstablishmentColorsForm>({
    resolver: zodResolver(EstablishmentColorsFormSchema),
    defaultValues: getEstablishmentColorsFormValues(),
  })

  const establishmentColorsValues = useWatch({
    control: formEstablishmentColors.control,
  })

  useSyncEstablishmentSettingsForm(
    formEstablishmentColors,
    establishmentColorsQuery.data,
    establishmentSettingsScopeIdentity,
    getEstablishmentColorsFormValues,
  )

  const {
    mutate: saveEstablishmentColors,
    isPending: isPendingSaveEstablishmentColors,
  } = useSaveEstablishmentSettings({
    isCurrentEstablishmentSettingsScope,
    successMessage: 'Cores salvas com sucesso.',
    onSaved: (savedSettings) =>
      formEstablishmentColors.reset(
        getEstablishmentColorsFormValues(savedSettings),
      ),
  })

  const handleSaveEstablishmentColors = (
    establishmentColors: EstablishmentColorsForm,
  ) => {
    if (isPendingSaveEstablishmentColors) {
      return
    }

    const establishmentId = resolveEstablishmentIdToSave(
      formEstablishmentColors.formState.isDirty,
    )

    if (!establishmentId) {
      return
    }

    saveEstablishmentColors({
      scope: establishmentSettingsScope,
      establishmentId,
      settings: establishmentColors,
    })
  }

  const handleDiscardEstablishmentColors = () => {
    if (!establishmentColorsQuery.data) {
      return
    }

    formEstablishmentColors.reset(
      getEstablishmentColorsFormValues(establishmentColorsQuery.data),
    )
  }

  return {
    establishmentColorsQuery,
    formEstablishmentColors,
    establishmentColorsValues,
    canUpdateEstablishmentColors,
    isPendingSaveEstablishmentColors,
    handleSaveEstablishmentColors,
    handleDiscardEstablishmentColors,
  }
}
