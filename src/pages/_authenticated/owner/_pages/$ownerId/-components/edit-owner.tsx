import { Button, Card, chakra, GridItem, SimpleGrid } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { z } from 'zod'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'
import {
  ownerMutationKeys,
  ownerQueryKeys,
} from '@/shared/constants/owner.query-key'
import type { OwnerModel } from '@/shared/services/owner/owner.dto'
import { updateOwnerService } from '@/shared/services/owner/owner.service'

const OwnerFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  businessName: z.string().min(1, 'O nome empresarial é obrigatório'),
})

type OwnerFormData = z.infer<typeof OwnerFormSchema>

interface EditOwnerProps {
  owner: Pick<OwnerModel, 'id' | 'name' | 'phone' | 'businessName'>
}

const EditOwner = ({ owner }: EditOwnerProps) => {
  const queryClient = useQueryClient()

  const { mutate: updateOwner, isPending: isPendingUpdateOwner } = useMutation({
    mutationKey: ownerMutationKeys.update(),
    mutationFn: updateOwnerService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ownerQueryKeys.user(data.userId),
      })

      toaster.success({ title: 'Proprietário atualizado com sucesso' })
    },
    onError: (error) => {
      toaster.error({
        title: error.message || 'Erro ao atualizar proprietário',
      })
    },
  })

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<OwnerFormData>({
    resolver: zodResolver(OwnerFormSchema),
    defaultValues: {
      name: owner.name,
      phone: owner.phone,
      businessName: owner.businessName,
    },
  })

  const handleUpdateOwner = (data: OwnerFormData) => {
    if (!isDirty) {
      toaster.error({ title: 'Nenhuma alteração detectada' })
      return
    }

    updateOwner(
      { ...data, id: owner.id },
      {
        onSuccess: () => reset(data),
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
          Atualize um proprietário para o seu estabelecimento.
        </Card.Title>
        <Card.Description>
          Após a atualização, você poderá gerenciar os estabelecimentos
          associados a este proprietário.
        </Card.Description>
      </Card.Header>

      <chakra.form w="full" onSubmit={handleSubmit(handleUpdateOwner)}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" w="full">
          <Field invalid={!!errors.name} errorText={errors.name?.message}>
            <InputField {...register('name')} placeholder="Digite seu nome" />
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
              loading={isPendingUpdateOwner}
            >
              Salvar proprietário
            </Button>
          </GridItem>
        </SimpleGrid>
      </chakra.form>
    </Card.Root>
  )
}

export default EditOwner
