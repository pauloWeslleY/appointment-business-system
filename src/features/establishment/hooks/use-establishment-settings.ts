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

const toScopeIdentity = (scope: EstablishmentSettingsScope) =>
  [scope.userId, scope.organizationId, scope.slug].join(':')

export function useEstablishmentSettings(
  establishmentSlug: string,
  memberContext: GetMeContextResponse,
) {
  const { data: session } = authClient.useSession()

  const scope: EstablishmentSettingsScope = {
    userId: session?.user.id ?? '',
    organizationId: session?.session.activeOrganizationId ?? '',
    slug: establishmentSlug,
  }
  const scopeIdentity = toScopeIdentity(scope)
  const activeScopeIdentity = useRef(scopeIdentity)

  useEffect(() => {
    activeScopeIdentity.current = scopeIdentity
  }, [scopeIdentity])

  const query = useQuery(establishmentSettingsQueryOptions(scope))

  const canUpdate =
    memberContext.organization.id === scope.organizationId &&
    memberContext.permissions.some(
      (permission) =>
        permission.resource === 'establishment' &&
        permission.action === 'update',
    )

  async function isCurrentScope(savedScope: EstablishmentSettingsScope) {
    const { data: currentSession } = await authClient.getSession()

    return (
      currentSession?.user.id === savedScope.userId &&
      currentSession.session.activeOrganizationId ===
        savedScope.organizationId &&
      activeScopeIdentity.current === toScopeIdentity(savedScope)
    )
  }

  function getEstablishmentIdToSave(isDirty: boolean): string | null {
    const belongsToActiveOrganization =
      query.data?.organizationId === scope.organizationId

    if (!query.data || !belongsToActiveOrganization || !canUpdate) {
      toaster.error({
        title: 'Você não tem acesso para alterar estas configurações.',
      })

      return null
    }

    if (!isDirty) {
      toaster.info({ title: 'Nenhuma alteração para salvar.' })
      return null
    }

    return query.data.id
  }

  return {
    scope,
    scopeIdentity,
    query,
    canUpdate,
    isCurrentScope,
    getEstablishmentIdToSave,
  }
}

export function useSyncEstablishmentSettingsForm<
  TFormValues extends FieldValues,
>(
  form: UseFormReturn<TFormValues>,
  settings: EstablishmentSettingsApiResponse | undefined,
  scopeIdentity: string,
  toFormValues: (settings: EstablishmentSettingsApiResponse) => TFormValues,
) {
  const loadedIdentity = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!settings) {
      return
    }

    const identity = [scopeIdentity, settings.id].join(':')

    form.reset(toFormValues(settings), {
      keepDirtyValues: loadedIdentity.current === identity,
    })

    loadedIdentity.current = identity
  }, [settings, form, scopeIdentity, toFormValues])
}

interface UseSaveEstablishmentSettingsOptions {
  isCurrentScope: (scope: EstablishmentSettingsScope) => Promise<boolean>
  onSaved: (settings: EstablishmentSettingsApiResponse) => void
  successMessage: string
}

export function useSaveEstablishmentSettings({
  isCurrentScope,
  onSaved,
  successMessage,
}: UseSaveEstablishmentSettingsOptions) {
  const router = useRouter()
  const mutationOptions = saveEstablishmentSettingsMutationOptions()

  return useMutation({
    ...mutationOptions,
    onSuccess: async (...args) => {
      await mutationOptions.onSuccess?.(...args)

      const [savedSettings, variables] = args

      if (!(await isCurrentScope(variables.scope))) {
        return
      }

      onSaved(savedSettings)
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
