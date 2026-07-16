import {
  Alert,
  Button,
  chakra,
  CloseButton,
  Flex,
  Stack,
} from '@chakra-ui/react'
import {
  type Control,
  Controller,
  type FieldErrors,
  useFieldArray,
} from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { Tooltip } from '@/components/ui/tooltip'

import type { EstablishmentFormData } from '..'

interface FormTelephoneEstablishmentProps {
  control: Control<EstablishmentFormData>
  errors: FieldErrors<EstablishmentFormData>
  onCloseAlertCreateTelephone: () => void
}

const FormTelephoneEstablishment = ({
  control,
  errors,
  onCloseAlertCreateTelephone,
}: FormTelephoneEstablishmentProps) => {
  const {
    fields: telephoneFields,
    append: appendTelephone,
    remove: removeTelephone,
  } = useFieldArray({ control, name: 'phones' })

  const addNewTelephone = () => appendTelephone({ phone: '' })
  const removeTelephoneByIndex = (index: number) => removeTelephone(index)

  return (
    <Flex
      aria-label="Form Telephones"
      gridColumn={{ base: 'span 1', md: 'span 4' }}
      w="full"
      gap="4"
      pl="2"
      borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      borderWidth="1px"
      rounded="lg"
      p="4"
    >
      <chakra.label display="flex" flexDir="column" alignItems="center" gap="4">
        Telefones
        <Button
          type="button"
          size="xs"
          rounded="lg"
          variant="ghost"
          colorPalette="green"
          onClick={addNewTelephone}
        >
          Adicionar telefone
        </Button>
      </chakra.label>

      <Stack direction="row" wrap="wrap" flex="1">
        {telephoneFields.map((field, index) => (
          <Flex key={field.id} gap="2" flexDir={{ base: 'column', md: 'row' }}>
            <Controller
              name={`phones.${index}.phone`}
              control={control}
              render={({ field }) => (
                <Field
                  invalid={!!errors.phones?.[index]?.phone}
                  errorText={errors.phones?.[index]?.phone?.message}
                >
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

            {telephoneFields.length > 1 && (
              <Tooltip content="Remover telefone" showArrow>
                <CloseButton
                  alignSelf={{ base: 'center', xl: 'flex-start' }}
                  size="xs"
                  rounded="full"
                  variant="ghost"
                  onClick={() => removeTelephoneByIndex(index)}
                  mt="0.5"
                />
              </Tooltip>
            )}
          </Flex>
        ))}
      </Stack>

      {errors.phones?.message && (
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
            <Alert.Description>{errors.phones?.message}</Alert.Description>
          </Alert.Content>

          <Button
            size="xs"
            variant="surface"
            rounded="lg"
            onClick={onCloseAlertCreateTelephone}
          >
            Fechar
          </Button>
        </Alert.Root>
      )}
    </Flex>
  )
}

export default FormTelephoneEstablishment
