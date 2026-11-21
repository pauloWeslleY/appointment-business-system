import { Alert, Box, Button, Flex, For, Stack, VStack } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import type { CustomerFormData } from '../types/customer-form-data.type'
import TelephoneContactCustomerField from './telephone-contact-customer-field'

const FormPhonesCustomer = () => {
  const form = useFormContext<CustomerFormData>()
  const {
    fields: telephoneFields,
    append: appendTelephone,
    remove: removeTelephone,
  } = useFieldArray({ control: form.control, name: 'phones' })

  const addNewTelephone = () => {
    if (telephoneFields.length >= 4) {
      toaster.warning({
        title: 'Limite de contatos atingido',
        description: 'Você não pode adicionar mais de 4 contatos.',
      })
      return
    }
    appendTelephone({ phone: '', type: 'telephone' })
  }

  const removeTelephoneByIndex = (index: number) => removeTelephone(index)

  return (
    <Box gridColumn={{ base: 'span 1', md: '1 / -1' }} spaceY="4">
      <Flex
        aria-label="Telefones do cliente"
        flexDir="row"
        gap="2"
        w="full"
        minW="0"
        borderColor={{ _light: 'gray.200', _dark: 'secondary.500/20' }}
        borderWidth="1px"
        rounded="lg"
        p="2"
      >
        <VStack justify="flex-start" gap="2">
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
        </VStack>

        <Stack wrap="wrap" flex="1" minW="0">
          <For each={telephoneFields}>
            {(input, index) => (
              <TelephoneContactCustomerField
                key={input.id}
                index={index}
                canRemove={telephoneFields.length > 1}
                onRemove={() => removeTelephoneByIndex(index)}
              />
            )}
          </For>
        </Stack>
      </Flex>

      {form.formState.errors.phones?.message && (
        <Alert.Root
          w="full"
          status="error"
          rounded="xl"
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
    </Box>
  )
}

export default FormPhonesCustomer
