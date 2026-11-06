import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { GetMeContextResponse } from '@/features/members/types/member-response.type'

import { EstablishmentLinksFormSchema } from '../schemas/establishment-links-form.schema'
import type { EstablishmentLinksForm } from '../types/establishment-links-form.type'
import { getEstablishmentLinksFormValues } from '../utils/establishment-links-form-values'
import {
  useEstablishmentSettings,
  useSaveEstablishmentSettings,
  useSyncEstablishmentSettingsForm,
} from './use-establishment-settings'

export function useFormEstablishmentLinks(
  establishmentSlug: string,
  memberContext: GetMeContextResponse,
) {
  const {
    establishmentSettingsScope,
    establishmentSettingsScopeIdentity: scopeIdentity,
    establishmentSettingsQuery: query,
    canUpdateEstablishmentSettings: canUpdate,
    isCurrentEstablishmentSettingsScope,
    resolveEstablishmentIdToSave,
  } = useEstablishmentSettings(establishmentSlug, memberContext)

  const form = useForm<EstablishmentLinksForm>({
    resolver: zodResolver(EstablishmentLinksFormSchema),
    defaultValues: getEstablishmentLinksFormValues(),
  })

  useSyncEstablishmentSettingsForm(
    form,
    query.data,
    scopeIdentity,
    getEstablishmentLinksFormValues,
  )

  const {
    mutate: saveEstablishmentLinks,
    isPending: isPendingSaveEstablishmentLinks,
  } = useSaveEstablishmentSettings({
    isCurrentEstablishmentSettingsScope,
    successMessage: 'Links salvos com sucesso.',
    onSaved: (settings) =>
      form.reset(getEstablishmentLinksFormValues(settings)),
  })

  const onSubmit = form.handleSubmit((links) => {
    if (isPendingSaveEstablishmentLinks) {
      return
    }

    const establishmentId = resolveEstablishmentIdToSave(form.formState.isDirty)

    if (!establishmentId) {
      return
    }

    saveEstablishmentLinks({
      scope: establishmentSettingsScope,
      establishmentId,
      settings: links,
    })
  })

  function discardChanges() {
    if (!query.data) {
      return
    }

    form.reset(getEstablishmentLinksFormValues(query.data))
  }

  return {
    query,
    form,
    scopeIdentity,
    canUpdate,
    onSubmit,
    isSaving: isPendingSaveEstablishmentLinks,
    discardChanges,
  }
}
