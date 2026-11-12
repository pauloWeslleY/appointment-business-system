import { Alert, Button, chakra, Flex, For, Grid } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import type { FormTelephoneEstablishmentType } from '../types/establishment-form-data.type'
import TelephoneContactField from './telephone-contact-field'

const FormTelephoneEstablishment = () => {
  const form = useFormContext<FormTelephoneEstablishmentType>()
  const {
    fields: telephoneFields,
    append: appendTelephone,
    remove: removeTelephone,
  } = useFieldArray({ control: form.control, name: 'phones' })

  const addNewTelephone = () => {
    if (telephoneFields.length >= 5) {
      toaster.warning({
        title: 'Limite de contatos atingido',
        description: 'Você não pode adicionar mais de 5 contatos.',
      })
      return
    }
    appendTelephone({ phone: '', type: 'telephone' })
  }

  const removeTelephoneByIndex = (index: number) => removeTelephone(index)

  return (
    <Flex
      aria-label="Form Telephones"
      gridColumn={{ base: 'span 1', md: '1 / -1' }}
      flexDir="row"
      w="full"
      minW="0"
      gap="4"
      p={{ base: '2', md: '4' }}
      rounded="lg"
      borderWidth="1px"
      borderColor={{ _light: 'gray.200', _dark: 'secondary.500/20' }}
      shadow={{ _light: 'shape', _dark: '2xs' }}
    >
      <chakra.div
        display="flex"
        flexDir="column"
        alignItems="center"
        gap={{ base: '2', md: '4' }}
      >
        Contato
        <Button
          type="button"
          size="xs"
          rounded="lg"
          variant="ghost"
          colorPalette="green"
          onClick={addNewTelephone}
        >
          Adicionar Contato
        </Button>
      </chakra.div>

      <Grid
        templateColumns="repeat(auto-fill, minmax(min(270px, 100%), 1fr))"
        gap="2"
        flex="1"
      >
        <For each={telephoneFields}>
          {(input, index) => (
            <TelephoneContactField
              key={input.id}
              index={index}
              canRemove={telephoneFields.length > 1}
              onRemove={() => removeTelephoneByIndex(index)}
            />
          )}
        </For>
      </Grid>

      {form.formState.errors.phones?.message && (
        <Alert.Root
          status="error"
          variant="surface"
          data-state="open"
          _open={{
            animationName: 'fade-in, scale-in',
            animationDuration: '300ms',
          }}
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Não foi possível cadastrar</Alert.Title>
            <Alert.Description>
              {form.formState.errors.phones?.message}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </Flex>
  )
}

export default FormTelephoneEstablishment
