import {
  Box,
  Button,
  Card,
  chakra,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import z from 'zod'

import InputField from '@/components/input-field'
import Header from '@/components/layout/header'
import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'
import {
  establishmentMutationKeys,
  establishmentQueryKeys,
} from '@/shared/constants/establishment.query-key'
import useGetOwnerById from '@/shared/hooks/use-get-owner-by-id'
import { createEstablishmentService } from '@/shared/services/establishment/establishment.service'
import { getViaCep } from '@/shared/services/via-cep/via-cep'

import FormIntervalEstablishment from './-components/form-intervals-establishment'
import FormTelephoneEstablishment from './-components/form-telephone-establishment'

export const Route = createFileRoute(
  '/_authenticated/establishment/_pages/new/',
)({
  component: CreateEstablishmentPage,
})

const EstablishmentFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  imageUrl: z
    .url('A URL da imagem é inválida')
    .min(1, 'A URL da imagem é obrigatória'),
  weekdays: z.array(z.string()).min(1, {
    message: 'É necessário selecionar pelo menos um dia de funcionamento',
  }),
  intervals: z
    .array(
      z.object({
        open: z.string().min(1, 'O horário de abertura é obrigatório'),
        close: z.string().min(1, 'O horário de fechamento é obrigatório'),
      }),
    )
    .min(
      1,
      'É necessário informar pelo menos um intervalo de horário de funcionamento',
    ),
  phones: z
    .array(
      z.object({
        phone: z.string().min(1, 'O telefone é obrigatório'),
      }),
    )
    .min(1, 'É necessário informar pelo menos um telefone'),
  address: z.object({
    street: z.string().min(1, 'O logradouro é obrigatório'),
    number: z.string().min(1, 'O número é obrigatório'),
    neighborhood: z.string().min(1, 'O bairro é obrigatório'),
    city: z.string().min(1, 'A cidade é obrigatória'),
    state: z.string().min(1, 'O estado é obrigatório'),
    zipCode: z.string().min(1, 'O CEP é obrigatório'),
    complement: z.string().min(1, 'O complemento é obrigatório'),
  }),
})

export type EstablishmentFormData = z.infer<typeof EstablishmentFormSchema>

function CreateEstablishmentPage() {
  const queryClient = useQueryClient()
  const navigate = Route.useNavigate()
  const { data: owner } = useGetOwnerById()

  const {
    mutate: createEstablishment,
    isPending: isPendingCreateEstablishment,
  } = useMutation({
    mutationKey: establishmentMutationKeys.create(),
    mutationFn: createEstablishmentService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: establishmentQueryKeys.owner(owner?.id),
      })

      toaster.success({ title: 'Estabelecimento criado com sucesso' })
      navigate({ to: '/establishment' })
    },
    onError: (error) => {
      toaster.error({
        title: error.message || 'Erro ao criar estabelecimento',
      })
    },
  })

  const {
    control,
    reset,
    register,
    getValues,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<EstablishmentFormData>({
    resolver: zodResolver(EstablishmentFormSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      weekdays: ['0'],
      intervals: [{ open: '', close: '' }],
      phones: [{ phone: '' }],
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        complement: '',
      },
    },
  })

  const handleCloseAlertCreatePhone = () => clearErrors('phones')
  const handleCloseAlertCreateIntervals = () => clearErrors('intervals')

  const onBlurZipCode = async (zipCode: string) => {
    if (zipCode.length === 0) {
      toaster.error({ title: 'CEP inválido' })
      return
    }

    try {
      const response = await getViaCep(zipCode)
      if (response.statusCode !== 200 || !response.body) {
        toaster.error({ title: 'CEP não encontrado' })
        return
      }

      if (typeof response.body === 'string') {
        toaster.error({ title: response.body })
        return
      }

      const addressFields = Object.entries({
        zipCode: response.body.cep,
        complement: response.body.complemento,
        street: response.body.logradouro,
        neighborhood: response.body.bairro,
        city: response.body.localidade,
        state: response.body.uf,
        number: getValues().address.number || '',
      })

      for (const [key, value] of addressFields) {
        setValue(`address.${key}` as keyof EstablishmentFormData, value)
      }
    } catch (error) {
      toaster.error({
        title: 'Erro ao buscar endereço pelo CEP',
        description: (error as Error).message || 'Erro desconhecido',
      })
    }
  }

  const handleCreateEstablishment = (params: EstablishmentFormData) => {
    if (!owner) {
      toaster.error({ title: 'Dados do usuário inválidos' })
      return
    }

    const intervals = params.intervals.map((interval) => ({
      open: interval.open.toString(),
      close: interval.close.toString(),
    }))

    if (!intervals.some(Boolean)) {
      toaster.error({
        title: 'Todos os horários devem estar preenchidos',
        description:
          'Preencha todos os horários de abertura e fechamento para cada dia selecionado',
      })
      return
    }

    createEstablishment(
      {
        name: params.name,
        description: params.description,
        imageUrl: params.imageUrl,
        ownerId: owner.id,
        phones: params.phones.map((item) => item.phone),
        openingHours: params.weekdays.map((day) => ({
          day: parseInt(day, 10),
          intervals: [intervals[parseInt(day, 10)]],
        })),
        address: params.address,
      },
      {
        onSuccess: () => reset(),
      },
    )
  }

  return (
    <Box spaceY={{ base: '4', lg: '6' }} w="full">
      <Header.Root>
        <Header.Button />
        <div>
          <Header.Title>Cadastrar estabelecimento</Header.Title>
          <Header.SubTitle>
            Após o cadastro, você poderá gerenciar os serviços e agendamentos do
            estabelecimento.
          </Header.SubTitle>
        </div>
      </Header.Root>

      <Card.Root
        variant="outline"
        rounded="xl"
        p="4"
        bg={{ base: 'white', _dark: 'gray.950/40' }}
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
        <chakra.form
          w="full"
          onSubmit={handleSubmit(handleCreateEstablishment)}
        >
          <SimpleGrid columns={{ base: 1, md: 4 }} gap="4" w="full">
            <Field
              gridColumn={{ base: 'span 1', lg: 'span 2' }}
              invalid={!!errors.name}
              errorText={errors.name?.message}
            >
              <InputField {...register('name')} placeholder="Digite seu nome" />
            </Field>

            <Field
              gridColumn={{ base: 'span 1', lg: 'span 2' }}
              invalid={!!errors.imageUrl}
              errorText={errors.imageUrl?.message}
            >
              <InputField
                {...register('imageUrl')}
                placeholder="Digite a URL da imagem"
              />
            </Field>

            <Field
              gridColumn={{ base: 'span 1', md: 'span 4' }}
              invalid={!!errors.description}
              errorText={errors.description?.message}
            >
              <InputField
                {...register('description')}
                placeholder="Digite a descrição"
              />
            </Field>

            <FormIntervalEstablishment
              values={getValues()}
              control={control}
              errors={errors}
              onCloseAlertCreateInterval={handleCloseAlertCreateIntervals}
            />

            <FormTelephoneEstablishment
              control={control}
              errors={errors}
              onCloseAlertCreateTelephone={handleCloseAlertCreatePhone}
            />

            <SimpleGrid
              aria-label="Form Address"
              gridColumn={{ base: 'span 1', md: 'span 4' }}
              columns={{ base: 1, md: 4 }}
              gap="4"
              w="full"
            >
              <GridItem
                colSpan={{ base: 1, md: 4 }}
                placeSelf={{ base: 'center', md: 'start' }}
                pl="2"
              >
                <Text as="span">Endereço</Text>
              </GridItem>

              <Controller
                name="address.zipCode"
                control={control}
                render={({ field }) => (
                  <Field
                    invalid={!!errors.address?.zipCode}
                    errorText={errors.address?.zipCode?.message}
                  >
                    <PatternFormat
                      value={field.value}
                      onValueChange={(values) => field.onChange(values.value)}
                      format="#####-###"
                      placeholder="00000-000"
                      mask="_"
                      customInput={InputField}
                      onBlur={() => onBlurZipCode(field.value)}
                    />
                  </Field>
                )}
              />

              <Field
                gridColumn={{ base: 'span 1', md: 'span 2' }}
                invalid={!!errors.address?.street}
                errorText={errors.address?.street?.message}
              >
                <InputField
                  {...register('address.street')}
                  placeholder="Digite o endereço"
                />
              </Field>
              <Field
                invalid={!!errors.address?.number}
                errorText={errors.address?.number?.message}
              >
                <InputField
                  {...register('address.number')}
                  placeholder="Digite o número"
                />
              </Field>
              <Field
                gridColumn={{ base: 'span 1', md: 'span 2' }}
                invalid={!!errors.address?.neighborhood}
                errorText={errors.address?.neighborhood?.message}
              >
                <InputField
                  {...register('address.neighborhood')}
                  placeholder="Digite o bairro"
                />
              </Field>

              <HStack
                gap="4"
                align="start"
                gridColumn={{ base: 'span 1', md: 'span 2' }}
              >
                <Field
                  invalid={!!errors.address?.city}
                  errorText={errors.address?.city?.message}
                >
                  <InputField
                    {...register('address.city')}
                    placeholder="Digite a cidade"
                  />
                </Field>
                <Field
                  invalid={!!errors.address?.state}
                  errorText={errors.address?.state?.message}
                >
                  <InputField
                    {...register('address.state')}
                    placeholder="Digite o estado"
                  />
                </Field>
                <Field
                  invalid={!!errors.address?.complement}
                  errorText={errors.address?.complement?.message}
                >
                  <InputField
                    {...register('address.complement')}
                    placeholder="Digite o complemento"
                  />
                </Field>
              </HStack>
            </SimpleGrid>

            <GridItem
              colSpan={{ base: 1, md: 4 }}
              placeSelf={{ base: 'center', md: 'end' }}
            >
              <Button
                type="submit"
                size="sm"
                rounded="xl"
                w="fit-content"
                loading={isPendingCreateEstablishment}
              >
                Criar estabelecimento
              </Button>
            </GridItem>
          </SimpleGrid>
        </chakra.form>
      </Card.Root>
    </Box>
  )
}
