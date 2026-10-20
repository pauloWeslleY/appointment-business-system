import { Button, Card, chakra, GridItem, SimpleGrid } from '@chakra-ui/react'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import { useFormCreateEstablishment } from '../hooks/use-form-create-establishment'

const FormCreateEstablishmentPage = () => {
  const {
    register,
    handleSubmit,
    errors,
    isPendingCreateEstablishment,
    handleCreateEstablishment,
    phoneFields,
    appendPhone,
    removePhone,
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
        <SimpleGrid columns={{ base: 1, md: 4 }} gap="4" w="full">
          <Field
            gridColumn={{ base: 'span 1', lg: 'span 2' }}
            invalid={!!errors.name}
            errorText={errors.name?.message}
          >
            <InputField {...register('name')} placeholder="Digite seu nome" />
          </Field>

          <Field
            gridColumn={{ base: 'span 1', md: 'span 2' }}
            invalid={!!errors.description}
            errorText={errors.description?.message}
          >
            <InputField
              {...register('description')}
              placeholder="Digite a descrição"
            />
          </Field>

          {phoneFields.map((phone, index) => (
            <Field
              key={phone.id}
              invalid={!!errors.phones?.[index]?.phone}
              errorText={errors.phones?.[index]?.phone?.message}
            >
              <InputField
                {...register(`phones.${index}.phone`)}
                placeholder="Telefone"
              />
              {phoneFields.length > 1 && (
                <Button type="button" onClick={() => removePhone(index)}>
                  Remover telefone
                </Button>
              )}
            </Field>
          ))}
          <Button
            type="button"
            onClick={() => appendPhone({ phone: '' })}
            disabled={phoneFields.length >= 5}
          >
            Adicionar telefone
          </Button>

          <GridItem
            colSpan={{ base: 1, md: 4 }}
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
