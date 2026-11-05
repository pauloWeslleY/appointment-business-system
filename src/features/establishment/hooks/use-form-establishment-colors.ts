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
    scope,
    scopeIdentity,
    query,
    canUpdate,
    isCurrentScope,
    getEstablishmentIdToSave,
  } = useEstablishmentSettings(establishmentSlug, memberContext)

  const form = useForm<EstablishmentColorsForm>({
    resolver: zodResolver(EstablishmentColorsFormSchema),
    defaultValues: getEstablishmentColorsFormValues(),
  })

  const values = useWatch({ control: form.control })

  useSyncEstablishmentSettingsForm(
    form,
    query.data,
    scopeIdentity,
    getEstablishmentColorsFormValues,
  )

  const mutation = useSaveEstablishmentSettings({
    isCurrentScope,
    successMessage: 'Cores salvas com sucesso.',
    onSaved: (settings) =>
      form.reset(getEstablishmentColorsFormValues(settings)),
  })

  const onSubmit = form.handleSubmit((colors) => {
    if (mutation.isPending) {
      return
    }

    const establishmentId = getEstablishmentIdToSave(form.formState.isDirty)

    if (!establishmentId) {
      return
    }

    mutation.mutate({ scope, establishmentId, settings: colors })
  })

  function discardChanges() {
    if (!query.data) {
      return
    }

    form.reset(getEstablishmentColorsFormValues(query.data))
  }

  return {
    query,
    form,
    values,
    canUpdate,
    onSubmit,
    isSaving: mutation.isPending,
    discardChanges,
  }
}
