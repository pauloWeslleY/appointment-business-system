import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { type DefaultValues, useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { createMeContextService } from '@/features/members/services/member-context.service'
import { createSlug } from '@/shared/utils/create-slug'
import {
  generateIdempontecyKey,
  idempontecy,
} from '@/shared/utils/idempontecy-key'

import { organizationProfileMutationOptions } from '../queries/organization-profile-mutation-options'
import { CreateOrganizationProfileFormSchema } from '../schemas/create-organization-profile.schema'
import type { CreateOrganizationProfileFormData } from '../types/create-organization-profile.api'

const formDefaultValues =
  (): DefaultValues<CreateOrganizationProfileFormData> => ({
    name: '',
    profile: {
      legalName: '',
      tradeName: '',
      email: '',
      phone: '',
    },
  })

export function useFormCreateOrganizationProfile() {
  const navigate = useNavigate()
  const {
    mutate: createOrganizationProfile,
    reset: resetCreateOrganizationProfile,
    isPending: isPendingCreateOrganizationProfile,
  } = useMutation({
    ...organizationProfileMutationOptions.create(),
    onSuccess: (organizationProfileData) => {
      const hasCreatedProfile = organizationProfileData.created
        ? {
            type: 'success',
            title: 'Perfil empresarial criado com sucesso',
            description: `Perfil foi criado corretamente, para a organização ${organizationProfileData.organization.name}`,
          }
        : {
            type: 'warning',
            title: 'Ops! Aviso',
            description: `O Perfil para a organização ${organizationProfileData.organization.name} já cadastrado.`,
          }

      toaster.create({ ...hasCreatedProfile })
    },
    onError: (error) => {
      toaster.error({
        title: error.message || 'Erro ao criar perfil empresarial',
      })
    },
  })

  const {
    control,
    reset,
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrganizationProfileFormData>({
    resolver: zodResolver(CreateOrganizationProfileFormSchema),
    defaultValues: formDefaultValues(),
  })

  const fieldTradeName = useWatch({ control, name: 'profile.tradeName' })

  const syncNameFromTradeName = () => {
    if (!fieldTradeName || fieldTradeName.trim() === '') {
      setError('profile.tradeName', {
        type: 'manual',
        message: 'O nome fantasia precisa ser preenchido',
      })
      return
    }

    setValue('name', fieldTradeName)
    clearErrors('profile.tradeName')
  }

  const handleCreateOrganizationProfile = (
    data: CreateOrganizationProfileFormData,
  ) => {
    const key = idempontecy.getKey() || generateIdempontecyKey()
    const slug = createSlug(data.name)

    if (!slug.success) {
      toaster.error({
        title: 'Ops! Não foi possível gerar o slug.',
        description: slug.error,
      })

      setError('root', { type: 'manual', message: slug.error })
      return
    }

    idempontecy.setKey(key)
    createOrganizationProfile(
      {
        ...data,
        slug: slug.data,
        idempotencyKey: key,
      },
      {
        onSuccess: async (organizationProfile) => {
          idempontecy.deleteKey()

          try {
            await createMeContextService({
              organizationId: organizationProfile.organization.id,
            })
          } catch (error) {
            toaster.error({
              title: 'Ops! Não foi possível ativar a organização.',
              description: (error as Error).message,
            })
            return
          }

          reset(data)
          resetCreateOrganizationProfile()
          await navigate({ to: '/organization', replace: true })
        },
        onError: (error) => {
          setError('root', { type: 'manual', message: error.message })
        },
      },
    )
  }

  return {
    control,
    errors,
    isPendingCreateOrganizationProfile,
    register,
    handleSubmit,
    handleCreateOrganizationProfile,
    syncNameFromTradeName,
  }
}
