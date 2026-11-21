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
    establishmentSettingsScopeIdentity: establishmentLinksScopeIdentity,
    establishmentSettingsQuery: establishmentLinksQuery,
    canUpdateEstablishmentSettings: canUpdateEstablishmentLinks,
    isCurrentEstablishmentSettingsScope,
    resolveEstablishmentIdToSave,
  } = useEstablishmentSettings(establishmentSlug, memberContext)

  const formEstablishmentLinks = useForm<EstablishmentLinksForm>({
    resolver: zodResolver(EstablishmentLinksFormSchema),
    defaultValues: getEstablishmentLinksFormValues(),
  })

  useSyncEstablishmentSettingsForm(
    formEstablishmentLinks,
    establishmentLinksQuery.data,
    establishmentLinksScopeIdentity,
    getEstablishmentLinksFormValues,
  )

  const {
    mutate: saveEstablishmentLinks,
    isPending: isPendingSaveEstablishmentLinks,
  } = useSaveEstablishmentSettings({
    isCurrentEstablishmentSettingsScope,
    successMessage: 'Links salvos com sucesso.',
    onSaved: (savedSettings) =>
      formEstablishmentLinks.reset(
        getEstablishmentLinksFormValues(savedSettings),
      ),
  })

  const isEstablishmentLinksFormDirty = formEstablishmentLinks.formState.isDirty
  const isEstablishmentLinksFieldsetDisabled =
    !canUpdateEstablishmentLinks || isPendingSaveEstablishmentLinks
  const isSaveEstablishmentLinksDisabled =
    !canUpdateEstablishmentLinks || !isEstablishmentLinksFormDirty

  const handleSaveEstablishmentLinks = formEstablishmentLinks.handleSubmit(
    (establishmentLinks) => {
      if (isPendingSaveEstablishmentLinks) {
        return
      }

      const establishmentId = resolveEstablishmentIdToSave(
        isEstablishmentLinksFormDirty,
      )

      if (!establishmentId) {
        return
      }

      saveEstablishmentLinks({
        scope: establishmentSettingsScope,
        establishmentId,
        settings: establishmentLinks,
      })
    },
  )

  function handleDiscardEstablishmentLinks() {
    if (!establishmentLinksQuery.data) {
      return
    }

    formEstablishmentLinks.reset(
      getEstablishmentLinksFormValues(establishmentLinksQuery.data),
    )
  }

  function retryEstablishmentLinks() {
    void establishmentLinksQuery.refetch()
  }

  return {
    establishmentLinksQuery,
    formEstablishmentLinks,
    establishmentLinksScopeIdentity,
    canUpdateEstablishmentLinks,
    isPendingSaveEstablishmentLinks,
    isEstablishmentLinksFormDirty,
    isEstablishmentLinksFieldsetDisabled,
    isSaveEstablishmentLinksDisabled,
    handleSaveEstablishmentLinks,
    handleDiscardEstablishmentLinks,
    retryEstablishmentLinks,
  }
}
