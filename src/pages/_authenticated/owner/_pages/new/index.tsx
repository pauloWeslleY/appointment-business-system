import { Button, Card, chakra, GridItem, SimpleGrid } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { z } from 'zod'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'
import { authClient } from '@/shared/auth'
import {
  ownerMutationKeys,
  ownerQueryKeys,
} from '@/shared/constants/owner.query-key'
import { createOwnerService } from '@/shared/services/owner/owner.service'

export const Route = createFileRoute('/_authenticated/owner/_pages/new/')({
  component: CreateOwnerPage,
})

const OwnerFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  cnpj: z.string().min(1, 'O CNPJ é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  businessName: z.string().min(1, 'O nome empresarial é obrigatório'),
  email: z.email('O e-mail é inválido').min(1, 'O e-mail é obrigatório'),
})

type OwnerFormData = z.infer<typeof OwnerFormSchema>

function CreateOwnerPage() {
  const { data } = authClient.useSession()
  const queryClient = useQueryClient()
  const navigate = Route.useNavigate()

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

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OwnerFormData>({
    resolver: zodResolver(OwnerFormSchema),
    defaultValues: {
      name: '',
      cnpj: '',
      phone: '',
      businessName: '',
      email: '',
    },
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
    <Card.Root
      variant="outline"
      rounded="xl"
      p="4"
      bg={{ base: 'white', _dark: 'gray.950/40' }}
    >
      <Card.Header p="0" mb="4">
        <Card.Title
          color={{ base: 'colorPalette.solid', _dark: 'colorPalette.fg' }}
        >
          Cadastre um proprietário para o seu estabelecimento.
        </Card.Title>
        <Card.Description>
          Apos o cadastro, você poderá gerenciar os estabelecimentos associados
          a este proprietário.
        </Card.Description>
      </Card.Header>

      <chakra.form w="full" onSubmit={handleSubmit(handleCreateOwner)}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" w="full">
          <Field
            gridColumn={{ base: 'span 1', md: 'span 2' }}
            invalid={!!errors.name}
            errorText={errors.name?.message}
          >
            <InputField {...register('name')} placeholder="Digite seu nome" />
          </Field>

          <Field invalid={!!errors.email} errorText={errors.email?.message}>
            <InputField
              {...register('email')}
              placeholder="Digite seu e-mail"
            />
          </Field>

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
                  customInput={InputField}
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
                  customInput={InputField}
                />
              </Field>
            )}
          />

          <Field
            invalid={!!errors.businessName}
            errorText={errors.businessName?.message}
          >
            <InputField
              {...register('businessName')}
              placeholder="Digite a razão social ou nome empresarial da empresa"
            />
          </Field>

          <GridItem
            colSpan={{ base: 1, md: 3 }}
            placeSelf={{ base: 'center', md: 'end' }}
          >
            <Button
              type="submit"
              size="sm"
              rounded="xl"
              w="fit-content"
              loading={isPendingCreateOwner}
            >
              Cadastrar proprietário
            </Button>
          </GridItem>
        </SimpleGrid>
      </chakra.form>
    </Card.Root>
  )
}
