import { Box, Button, chakra, HStack, Input, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'
import { Controller, type DefaultValues, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import z from 'zod'

import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/shared/auth'
import {
  ownerMutationKeys,
  ownerQueryKeys,
} from '@/shared/constants/owner.query-key'
import { createOwnerService } from '@/shared/services/owner/owner.service'

const OwnerFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  cnpj: z.string().min(1, 'O CNPJ é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  businessName: z.string().min(1, 'O nome empresarial é obrigatório'),
  email: z.email('O e-mail é inválido').min(1, 'O e-mail é obrigatório'),
})

type OwnerFormData = z.infer<typeof OwnerFormSchema>

const FormCreateOwner = () => {
  const { data } = authClient.useSession()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: createOwner, isPending: isPendingCreateOwner } = useMutation({
    mutationKey: ownerMutationKeys.create(),
    mutationFn: createOwnerService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ownerQueryKeys.user(data.userId),
      })

      toaster.success({ title: 'Proprietário criado com sucesso' })
      navigate({ to: '/establishment' })
    },
    onError: (error) => {
      toaster.error({
        title: error.message || 'Erro ao criar proprietário',
      })
    },
  })

  const formDefaultValues = useMemo<DefaultValues<OwnerFormData>>(
    () => ({
      name: data?.user?.name || '',
      email: data?.user?.email || '',
      cnpj: '',
      phone: '',
      businessName: '',
    }),
    [data],
  )

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OwnerFormData>({
    resolver: zodResolver(OwnerFormSchema),
    defaultValues: formDefaultValues,
  })

  const handleCreateOwner = (params: OwnerFormData) => {
    if (!data || !data.user?.id) {
      toaster.error({ title: 'Dados do usuário inválidos' })
      return
    }

    createOwner(
      { ...params, userId: data.user.id },
      {
        onSuccess: () => reset(),
      },
    )
  }

  return (
    <chakra.form
      w="full"
      display="flex"
      flexDir="column"
      gap={{ base: '4', md: '6' }}
      onSubmit={handleSubmit(handleCreateOwner)}
    >
      <Box>
        <Text
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          color={{ base: 'colorPalette.500', _dark: 'colorPalette.300' }}
        >
          Cadastre um proprietário!
        </Text>
        <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>
          Insira as informações do proprietário para criar sua conta.
        </Text>
      </Box>

      <HStack w="full" gap={{ base: '4', md: '6' }}>
        <Field invalid={!!errors.name} errorText={errors.name?.message}>
          <Input
            {...register('name')}
            placeholder="Digite seu nome"
            rounded="xl"
            size="sm"
            borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
          />
        </Field>

        <Field invalid={!!errors.email} errorText={errors.email?.message}>
          <Input
            {...register('email')}
            placeholder="Digite seu e-mail"
            rounded="xl"
            size="sm"
            borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
          />
        </Field>
      </HStack>

      <HStack w="full" gap={{ base: '4', md: '6' }}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Field invalid={!!errors.phone} errorText={errors.phone?.message}>
              <PatternFormat
                value={field.value}
                onValueChange={(values) => field.onChange(values.value)}
                format="(##) #####-####"
                placeholder="(00) 00000-0000"
                mask="_"
                customInput={Input}
                rounded="xl"
                size="sm"
                borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
              />
            </Field>
          )}
        />

        <Controller
          name="cnpj"
          control={control}
          render={({ field }) => (
            <Field invalid={!!errors.cnpj} errorText={errors.cnpj?.message}>
              <PatternFormat
                value={field.value}
                onValueChange={(values) => field.onChange(values.value)}
                format="##.###.###/####-##"
                placeholder="00.000.000/0000-00"
                mask="_"
                customInput={Input}
                rounded="xl"
                size="sm"
                borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
              />
            </Field>
          )}
        />
      </HStack>

      <Field
        invalid={!!errors.businessName}
        errorText={errors.businessName?.message}
      >
        <Input
          {...register('businessName')}
          placeholder="Digite a razão social ou nome empresarial da empresa"
          rounded="xl"
          size="sm"
          borderColor={{ base: 'gray.400', _dark: 'gray.600' }}
        />
      </Field>

      <Button
        type="submit"
        size="sm"
        rounded="xl"
        w="full"
        loading={isPendingCreateOwner}
      >
        Cadastrar proprietário
      </Button>
    </chakra.form>
  )
}

export default FormCreateOwner
