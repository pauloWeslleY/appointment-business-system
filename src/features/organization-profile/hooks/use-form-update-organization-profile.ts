import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { type DefaultValues, useForm } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import { organizationProfileQueryKeys } from '../queries/organization-profile-query-key'
import { UpdateOrganizationProfileFormSchema } from '../schemas/update-organization-profile.schema'
import type { GetOrganizationProfileResponse } from '../types/get-organization-profile.model'
import {
  loadOptionsStatusOrganizationProfile,
  StatusOrganizationProfile,
  type StatusOrganizationProfileType,
} from '../types/status-organization-profile.type'
import type { UpdateProfileOrganizationRequest } from '../types/update-organization-profile.api'
import { useMutationPatchOrganizationProfile } from './use-mutation-patch-organization-profile'

export function useFormUpdateOrganizationProfile() {
  const queryClient = useQueryClient()
  const organizationProfile =
    queryClient.getQueryData<GetOrganizationProfileResponse>(
      organizationProfileQueryKeys.summary(),
    )
  const {
    mutate: updateOrganizationProfile,
    isPending: isPendingUpdateOrganizationProfile,
  } = useMutationPatchOrganizationProfile()

  const filteredStatusOptions = useMemo(() => {
    const blockedStatus = new Set<StatusOrganizationProfileType>([
      StatusOrganizationProfile.SUSPENDED,
      StatusOrganizationProfile.PENDING,
    ])

    return loadOptionsStatusOrganizationProfile.filter(
      (item) => !blockedStatus.has(item.value),
    )
  }, [])

  const defaultValuesFormUpdateOrganizationProfile = useMemo<
    DefaultValues<UpdateProfileOrganizationRequest>
  >(
    () => ({
      email: organizationProfile?.email ?? '',
      phone: organizationProfile?.phone ?? '',
      tradeName: organizationProfile?.tradeName ?? '',
      legalName: organizationProfile?.legalName ?? '',
      status:
        organizationProfile?.status as UpdateProfileOrganizationRequest['status'],
    }),
    [organizationProfile],
  )

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileOrganizationRequest>({
    resolver: zodResolver(UpdateOrganizationProfileFormSchema),
    defaultValues: defaultValuesFormUpdateOrganizationProfile,
  })

  const handleUpdateOrganizationProfile = (
    data: UpdateProfileOrganizationRequest,
  ) => {
    if (!isDirty) {
      toaster.error({ title: 'Nenhuma alteração detectada' })
      return
    }

    updateOrganizationProfile(data, {
      onSuccess: () => reset(data),
    })
  }

  return {
    errors,
    control,
    isPendingUpdateOrganizationProfile,
    filteredStatusOptions,
    register,
    handleSubmit,
    handleUpdateOrganizationProfile,
  }
}
