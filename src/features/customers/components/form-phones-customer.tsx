import { Alert, Button, chakra, Flex, Stack } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import type { CustomerFormData } from '../types/customer-form-data.type'
import TelephoneContactCustomerField from './telephone-contact-customer-field'

const FormPhonesCustomer = () => {
  const form = useFormContext<CustomerFormData>()
  const {
    fields: telephoneFields,
    append: appendTelephone,
    remove: removeTelephone,
  } = useFieldArray({ control: form.control, name: 'phones' })

  const addNewTelephone = () =>
    appendTelephone({ phone: '', type: 'telephone' })

  const removeTelephoneByIndex = (index: number) => removeTelephone(index)

  return (
    <Flex
      aria-label="Telefones do cliente"
      gridColumn={{ base: 'span 1', md: '1 / -1' }}
      w="full"
      minW="0"
      flexDir={{ base: 'column', xl: 'row' }}
      gap="4"
      pl="2"
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      borderWidth="1px"
      rounded="lg"
      shadow={{ base: 'shape', md: '2xs' }}
      p="4"
    >
      <chakra.div display="flex" flexDir="column" alignItems="center" gap="4">
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

      <Stack direction="row" wrap="wrap" flex="1" minW="0">
        {telephoneFields.map((input, index) => (
          <TelephoneContactCustomerField
            key={input.id}
            index={index}
            canRemove={telephoneFields.length > 1}
            onRemove={() => removeTelephoneByIndex(index)}
          />
        ))}
      </Stack>

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

export default FormPhonesCustomer
