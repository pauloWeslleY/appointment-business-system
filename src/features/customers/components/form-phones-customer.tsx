import {
  Alert,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  type FlexProps,
  HStack,
  Icon,
  IconButton,
  Separator,
  SimpleGrid,
} from '@chakra-ui/react'
import { Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Controller, useFieldArray, type UseFormReturn } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { Tooltip } from '@/components/ui/tooltip'
import { maplabelFormPhonesMask } from '@/shared/constants/form-phones-mask'
import { FormatMask } from '@/shared/utils/formatted-mask'

import type { CustomerFormData } from '../types/customer-form-data.type'

interface FormPhonesCustomerProps extends FlexProps {
  form: UseFormReturn<CustomerFormData>
}

const FormPhonesCustomer = ({ form, ...props }: FormPhonesCustomerProps) => {
  const [mask, setMask] = useState<string>(FormatMask.TELEPHONE)

  const {
    fields: phonesFields,
    append: appendPhones,
    remove: removePhones,
  } = useFieldArray({ control: form.control, name: 'phones' })

  const labelFormPhonesMask = useMemo(
    () => maplabelFormPhonesMask(mask),
    [mask],
  )

  const addNewPhones = () => appendPhones({ phone: '' })

  const removePhonesByIndex = (index: number) => removePhones(index)

  const onCloseAlertPhones = () => form.clearErrors('phones')

  return (
    <Flex
      {...props}
      aria-label="Form Phones"
      flexDir="column"
      w="full"
      gap="4"
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      borderWidth="1px"
      rounded="lg"
      shadow={{ base: 'shape', md: '2xs' }}
      p="2"
    >
      <HStack>
        <ButtonGroup gap="2" flexDir={{ base: 'column', md: 'row' }}>
          <Button
            id="telephone-button"
            onClick={() => setMask(FormatMask.TELEPHONE)}
            size="xs"
            rounded="lg"
            variant={mask === FormatMask.TELEPHONE ? 'solid' : 'outline'}
          >
            Telefone fixo
          </Button>
          <Button
            id="cellphone-button"
            onClick={() => setMask(FormatMask.CELLPHONE)}
            size="xs"
            rounded="lg"
            variant={mask === FormatMask.CELLPHONE ? 'solid' : 'outline'}
          >
            Celular
          </Button>
        </ButtonGroup>

        <Separator
          orientation="vertical"
          height="8"
          borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
        />

        <chakra.label display="flex" flexDir="row" alignItems="center" gap="4">
          {labelFormPhonesMask.title}
          <Button
            type="button"
            size="xs"
            rounded="lg"
            variant="ghost"
            colorPalette="green"
            onClick={addNewPhones}
          >
            Adicionar {labelFormPhonesMask.label}
          </Button>
        </chakra.label>
      </HStack>

      <SimpleGrid
        w="full"
        columns={{ base: 1, md: phonesFields.length > 1 ? 2 : 1 }}
        gap="4"
      >
        {phonesFields.map((input, index) => (
          <Flex key={input.id} gap="2" flexDir={{ base: 'column', md: 'row' }}>
            <Controller
              name={`phones.${index}.phone`}
              control={form.control}
              render={({ field }) => {
                return (
                  <Field
                    invalid={!!form.formState.errors.phones?.[index]?.phone}
                    errorText={
                      form.formState.errors.phones?.[index]?.phone?.message
                    }
                  >
                    <PatternFormat
                      value={field.value}
                      onValueChange={(values) => field.onChange(values.value)}
                      mask="_"
                      format={mask}
                      placeholder={labelFormPhonesMask.placeholder}
                      customInput={InputField}
                    />
                  </Field>
                )
              }}
            />

            {phonesFields.length > 1 && (
              <Tooltip content="Remover telefone" showArrow>
                <IconButton
                  alignSelf={{ base: 'center', xl: 'flex-start' }}
                  size="xs"
                  rounded="full"
                  variant="ghost"
                  colorPalette="red"
                  onClick={() => removePhonesByIndex(index)}
                  mt="0.5"
                >
                  <Icon as={Trash2} boxSize="4" />
                </IconButton>
              </Tooltip>
            )}
          </Flex>
        ))}
      </SimpleGrid>

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

          <Button
            size="xs"
            variant="surface"
            rounded="lg"
            onClick={onCloseAlertPhones}
          >
            Fechar
          </Button>
        </Alert.Root>
      )}
    </Flex>
  )
}

export default FormPhonesCustomer
