import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import type { GetMeContextResponse } from '@/features/members/types/member-response.type'
import { authClient } from '@/lib/auth'

import { saveEstablishmentSettingsMutationOptions } from '../queries/establishment-settings.mutation-options'
import { establishmentSettingsQueryOptions } from '../queries/establishment-settings.query-options'
import type {
  EstablishmentSettingsApiResponse,
  EstablishmentSettingsScope,
} from '../types/establishment-settings.type'

const toEstablishmentSettingsScopeIdentity = (
  establishmentSettingsScope: EstablishmentSettingsScope,
) =>
  [
    establishmentSettingsScope.userId,
    establishmentSettingsScope.organizationId,
    establishmentSettingsScope.slug,
  ].join(':')

export function useEstablishmentSettings(
  establishmentSlug: string,
  memberContext: GetMeContextResponse,
) {
  const { data: session } = authClient.useSession()

  const establishmentSettingsScope: EstablishmentSettingsScope = {
    userId: session?.user.id ?? '',
    organizationId: session?.session.activeOrganizationId ?? '',
    slug: establishmentSlug,
  }
  const establishmentSettingsScopeIdentity =
    toEstablishmentSettingsScopeIdentity(establishmentSettingsScope)
  const activeEstablishmentSettingsScopeIdentity = useRef(
    establishmentSettingsScopeIdentity,
  )

  useEffect(() => {
    activeEstablishmentSettingsScopeIdentity.current =
      establishmentSettingsScopeIdentity
  }, [establishmentSettingsScopeIdentity])

  const establishmentSettingsQuery = useQuery(
    establishmentSettingsQueryOptions(establishmentSettingsScope),
  )

  const canUpdateEstablishmentSettings =
    memberContext.organization.id ===
      establishmentSettingsScope.organizationId &&
    memberContext.permissions.some(
      (permission) =>
        permission.resource === 'establishment' &&
        permission.action === 'update',
    )

  async function isCurrentEstablishmentSettingsScope(
    savedEstablishmentSettingsScope: EstablishmentSettingsScope,
  ) {
    const { data: currentSession } = await authClient.getSession()

    return (
      currentSession?.user.id === savedEstablishmentSettingsScope.userId &&
      currentSession.session.activeOrganizationId ===
        savedEstablishmentSettingsScope.organizationId &&
      activeEstablishmentSettingsScopeIdentity.current ===
        toEstablishmentSettingsScopeIdentity(savedEstablishmentSettingsScope)
    )
  }

  function resolveEstablishmentIdToSave(isDirty: boolean): string | null {
    const establishmentSettings = establishmentSettingsQuery.data
    const belongsToActiveOrganization =
      establishmentSettings?.organizationId ===
      establishmentSettingsScope.organizationId

    if (
      !establishmentSettings ||
      !belongsToActiveOrganization ||
      !canUpdateEstablishmentSettings
    ) {
      toaster.error({
        title: 'Você não tem acesso para alterar estas configurações.',
      })

      return null
    }

    if (!isDirty) {
      toaster.info({ title: 'Nenhuma alteração para salvar.' })
      return null
    }

    return establishmentSettings.id
  }

  return {
    establishmentSettingsScope,
    establishmentSettingsScopeIdentity,
    establishmentSettingsQuery,
    canUpdateEstablishmentSettings,
    isCurrentEstablishmentSettingsScope,
    resolveEstablishmentIdToSave,
  }
}

export function useSyncEstablishmentSettingsForm<
  TFormValues extends FieldValues,
>(
  formEstablishmentSettings: UseFormReturn<TFormValues>,
  establishmentSettings: EstablishmentSettingsApiResponse | undefined,
  establishmentSettingsScopeIdentity: string,
  toFormValues: (
    establishmentSettings: EstablishmentSettingsApiResponse,
  ) => TFormValues,
) {
  const loadedEstablishmentSettingsIdentity = useRef<string | undefined>(
    undefined,
  )

  useEffect(() => {
    if (!establishmentSettings) {
      return
    }

    const establishmentSettingsIdentity = [
      establishmentSettingsScopeIdentity,
      establishmentSettings.id,
    ].join(':')

    formEstablishmentSettings.reset(toFormValues(establishmentSettings), {
      keepDirtyValues:
        loadedEstablishmentSettingsIdentity.current ===
        establishmentSettingsIdentity,
    })

    loadedEstablishmentSettingsIdentity.current = establishmentSettingsIdentity
  }, [
    establishmentSettings,
    formEstablishmentSettings,
    establishmentSettingsScopeIdentity,
    toFormValues,
  ])
}

interface UseSaveEstablishmentSettingsOptions {
  isCurrentEstablishmentSettingsScope: (
    establishmentSettingsScope: EstablishmentSettingsScope,
  ) => Promise<boolean>
  onSaved: (
    savedEstablishmentSettings: EstablishmentSettingsApiResponse,
  ) => void
  successMessage: string
}

export function useSaveEstablishmentSettings({
  isCurrentEstablishmentSettingsScope,
  onSaved,
  successMessage,
}: UseSaveEstablishmentSettingsOptions) {
  const router = useRouter()
  const saveEstablishmentSettingsOptions =
    saveEstablishmentSettingsMutationOptions()

  return useMutation({
    ...saveEstablishmentSettingsOptions,
    onSuccess: async (...args) => {
      await saveEstablishmentSettingsOptions.onSuccess?.(...args)

      const [savedEstablishmentSettings, variables] = args

      if (!(await isCurrentEstablishmentSettingsScope(variables.scope))) {
        return
      }

      onSaved(savedEstablishmentSettings)
      await router.invalidate()
      toaster.success({ title: successMessage })
    },
    onError: (error) => {
      toaster.error({
        title: 'Não foi possível salvar as configurações.',
        description: error.message,
      })
    },
  })
}
