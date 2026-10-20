import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { type DefaultValues, useForm, useWatch } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
import { type CreateOrganizationProfileFormData } from '@/features/organization-profile/types/organization-profile-form.type'
import { createSlug } from '@/shared/utils/create-slug'
import {
  generateIdempontecyKey,
  idempontecy,
} from '@/shared/utils/idempontecy-key'

import { organizationProfileMutationOptions } from '../queries/organization-profile-mutation-options'
import { CreateOrganizationProfileFormSchema } from '../schemas/create-organization-profile.schema'

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
    isPending: isPendingCreateOrganizationProfile,
    reset: resetCreateOrganizationProfile,
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
    getValues,
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

  const handleCancelCreateOrganizationProfile = () => {
    const dataCreateOrganizationProfile = getValues()

    const isValidFieldsFormCreateOrganizationProfile = Object.values(
      dataCreateOrganizationProfile,
    ).every((fields) => {
      const isObjectValid = Object.values(fields).every(
        (field) => field === '' || field === undefined,
      )

      return typeof fields === 'string'
        ? fields === '' || fields === undefined
        : isObjectValid
    })

    if (isValidFieldsFormCreateOrganizationProfile) {
      toaster.warning({
        title: 'Atenção',
        description:
          'Ainda existem campos obrigatórios que não foram preenchidos.',
      })

      setError('root', {
        type: 'manual',
        message: 'Existem campos obrigatórios não preenchidos',
      })

      for (const [key, value] of Object.entries(
        dataCreateOrganizationProfile,
      )) {
        if (
          typeof value === 'string' &&
          (value === '' || value === undefined)
        ) {
          setError(key as keyof CreateOrganizationProfileFormData, {
            type: 'manual',
            message: 'Campo obrigatório',
          })
        }

        for (const [subKey, subValue] of Object.entries(value)) {
          if (subValue === '' || subValue === undefined) {
            setError(
              `profile.${subKey}` as keyof CreateOrganizationProfileFormData,
              {
                type: 'manual',
                message: 'Campo obrigatório',
              },
            )
          }
        }
      }

      return
    }

    navigate({ to: '/organization', replace: true })
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
        onSuccess: () => {
          idempontecy.deleteKey()
          reset(data)
          resetCreateOrganizationProfile()
          navigate({ to: '/organization', replace: true })
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
    handleCancelCreateOrganizationProfile,
    syncNameFromTradeName,
  }
}
