import { Button, Card, chakra, GridItem, SimpleGrid } from '@chakra-ui/react'
import { FormProvider } from 'react-hook-form'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import FormTelephoneEstablishment from '../components/form-telephone-establishment'
import { useFormCreateEstablishment } from '../hooks/use-form-create-establishment'

const FormCreateEstablishmentPage = () => {
  const {
    formCreateEstablishment,
    isPendingCreateEstablishment,
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
      <FormProvider {...formCreateEstablishment}>
        <chakra.form
          w="full"
          onSubmit={formCreateEstablishment.handleSubmit(
            handleCreateEstablishment,
          )}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" w="full">
            <Field
              label="Nome do estabelecimento"
              invalid={!!formCreateEstablishment.formState.errors.name}
              errorText={formCreateEstablishment.formState.errors.name?.message}
            >
              <InputField
                {...formCreateEstablishment.register('name')}
                placeholder="Ex: Meu Estabelecimento"
              />
            </Field>

            <Field
              label="E-mail do estabelecimento"
              invalid={!!formCreateEstablishment.formState.errors.email}
              errorText={
                formCreateEstablishment.formState.errors.email?.message
              }
            >
              <InputField
                {...formCreateEstablishment.register('email')}
                placeholder="Ex: meu@email.com"
              />
            </Field>

            <Field
              label="Fuso horário"
              invalid={!!formCreateEstablishment.formState.errors.timezone}
              errorText={
                formCreateEstablishment.formState.errors.timezone?.message
              }
            >
              <InputField
                {...formCreateEstablishment.register('timezone')}
                placeholder="Ex: America/Sao_Paulo"
              />
            </Field>

            <Field
              label="Descrição do estabelecimento"
              gridColumn={{ base: 'span 1', md: '1 / -1' }}
              invalid={!!formCreateEstablishment.formState.errors.description}
              errorText={
                formCreateEstablishment.formState.errors.description?.message
              }
            >
              <InputField
                {...formCreateEstablishment.register('description')}
                placeholder="Ex: Meu estabelecimento é especializado em..."
              />
            </Field>

            <FormTelephoneEstablishment />

            <GridItem
              colSpan={{ base: 1, md: 3 }}
              placeSelf={{ base: 'center', md: 'end' }}
            >
              <Button
                type="submit"
                size="sm"
                rounded="xl"
                w="fit"
                colorPalette="brand"
                loading={isPendingCreateEstablishment}
              >
                Cadastrar estabelecimento
              </Button>
            </GridItem>
          </SimpleGrid>
        </chakra.form>
      </FormProvider>
    </Card.Root>
  )
}

export default FormCreateEstablishmentPage
