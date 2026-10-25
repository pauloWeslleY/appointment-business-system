import { Button, Card, chakra, GridItem, SimpleGrid } from '@chakra-ui/react'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import FormTelephoneEstablishment from '../components/form-telephone-establishment'
import { useFormCreateEstablishment } from '../hooks/use-form-create-establishment'

const FormCreateEstablishmentPage = () => {
  const {
    control,
    errors,
    isPendingCreateEstablishment,
    register,
    handleSubmit,
    handleCreateEstablishment,
  } = useFormCreateEstablishment()

  return (
    <Card.Root
      variant="outline"
      rounded="xl"
      p="4"
      shadow="xs"
      bg={{ base: 'white', _dark: 'gray.950/40' }}
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
    >
      <chakra.form w="full" onSubmit={handleSubmit(handleCreateEstablishment)}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" w="full">
          <Field
            label="Nome do estabelecimento"
            invalid={!!errors.name}
            errorText={errors.name?.message}
          >
            <InputField
              {...register('name')}
              placeholder="Ex: Meu Estabelecimento"
            />
          </Field>

          <Field
            label="E-mail do estabelecimento"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <InputField
              {...register('email')}
              placeholder="Ex: meu@email.com"
            />
          </Field>

          <Field
            label="Fuso horário"
            invalid={!!errors.timezone}
            errorText={errors.timezone?.message}
          >
            <InputField {...register('timezone')} placeholder="Ex: GMT-3" />
          </Field>

          <Field
            label="Descrição do estabelecimento"
            gridColumn={{ base: 'span 1', md: '1 / -1' }}
            invalid={!!errors.description}
            errorText={errors.description?.message}
          >
            <InputField
              {...register('description')}
              placeholder="Ex: Meu estabelecimento é especializado em..."
            />
          </Field>

          <FormTelephoneEstablishment
            control={control}
            errors={errors}
            onCloseAlertTelephone={() => {}}
          />

          <GridItem
            colSpan={{ base: 1, md: 3 }}
            placeSelf={{ base: 'center', md: 'end' }}
          >
            <Button
              type="submit"
              size="sm"
              rounded="xl"
              w="fit"
              variant="subtle"
              colorPalette="emerald"
              loading={isPendingCreateEstablishment}
            >
              Cadastrar estabelecimento
            </Button>
          </GridItem>
        </SimpleGrid>
      </chakra.form>
    </Card.Root>
  )
}

export default FormCreateEstablishmentPage
