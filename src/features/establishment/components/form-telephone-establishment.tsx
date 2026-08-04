import {
  Alert,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  Icon,
  IconButton,
  Stack,
} from '@chakra-ui/react'
import { Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
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
import { FormatMask } from '@/shared/utils/formatted-mask'

import type { EstablishmentFormData } from '../types/establishment-form-data.type'

interface FormTelephoneEstablishmentProps {
  control: Control<EstablishmentFormData>
  errors: FieldErrors<EstablishmentFormData>
  onCloseAlertTelephone: () => void
}

const FormTelephoneEstablishment = ({
  control,
  errors,
  onCloseAlertTelephone,
}: FormTelephoneEstablishmentProps) => {
  const [mask, setMask] = useState<string>(FormatMask.TELEPHONE)

  const {
    fields: telephoneFields,
    append: appendTelephone,
    remove: removeTelephone,
  } = useFieldArray({ control, name: 'phones' })

  const labelFormTelephoneMask = useMemo(() => {
    const labelFormTelephoneMask: Record<
      string,
      { title: string; label: string }
    > = {
      [FormatMask.TELEPHONE]: {
        title: 'Telefone fixo',
        label: 'Telefone',
      },
      [FormatMask.CELLPHONE]: {
        title: 'Celular',
        label: 'Celular',
      },
    } as const
    return (
      labelFormTelephoneMask[mask] ||
      labelFormTelephoneMask[FormatMask.TELEPHONE]
    )
  }, [mask])

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
      shadow={{ base: 'shape', md: '2xs' }}
      p="4"
    >
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

      <chakra.label display="flex" flexDir="column" alignItems="center" gap="4">
        {labelFormTelephoneMask.title}
        <Button
          type="button"
          size="xs"
          rounded="lg"
          variant="ghost"
          colorPalette="green"
          onClick={addNewTelephone}
        >
          Adicionar {labelFormTelephoneMask.label}
        </Button>
      </chakra.label>

      <Stack direction="row" wrap="wrap" flex="1">
        {telephoneFields.map((input, index) => (
          <Flex key={input.id} gap="2" flexDir={{ base: 'column', md: 'row' }}>
            <Controller
              name={`phones.${index}.phone`}
              control={control}
              render={({ field }) => {
                return (
                  <Field
                    invalid={!!errors.phones?.[index]?.phone}
                    errorText={errors.phones?.[index]?.phone?.message}
                  >
                    <PatternFormat
                      value={field.value}
                      onValueChange={(values) => field.onChange(values.value)}
                      format={mask}
                      placeholder={
                        mask === FormatMask.TELEPHONE
                          ? '(00) 0000-0000'
                          : '(00) 00000-0000'
                      }
                      mask="_"
                      customInput={InputField}
                    />
                  </Field>
                )
              }}
            />

            {telephoneFields.length > 1 && (
              <Tooltip content="Remover telefone" showArrow>
                <IconButton
                  alignSelf={{ base: 'center', xl: 'flex-start' }}
                  size="xs"
                  rounded="full"
                  variant="ghost"
                  colorPalette="red"
                  onClick={() => removeTelephoneByIndex(index)}
                  mt="0.5"
                >
                  <Icon as={Trash2} boxSize="4" />
                </IconButton>
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
            onClick={onCloseAlertTelephone}
          >
            Fechar
          </Button>
        </Alert.Root>
      )}
    </Flex>
  )
}

export default FormTelephoneEstablishment
