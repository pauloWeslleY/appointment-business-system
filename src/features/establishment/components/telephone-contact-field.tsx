import { Flex, Icon, IconButton } from '@chakra-ui/react'
import { Phone, Smartphone, Trash2 } from 'lucide-react'
import { useController, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { Tooltip } from '@/components/ui/tooltip'
import { FormatMask } from '@/shared/utils/formatted-mask'

import type {
  CreateEstablishmentFormData,
  FormTelephoneEstablishmentType,
} from '../types/establishment-form-data.type'

const phoneFormats: Record<
  CreateEstablishmentFormData['phones'][number]['type'],
  { mask: string; placeholder: string }
> = {
  telephone: {
    mask: FormatMask.TELEPHONE,
    placeholder: '(00) 0000-0000',
  },
  cellphone: {
    mask: FormatMask.CELLPHONE,
    placeholder: '(00) 00000-0000',
  },
}

interface TelephoneContactFieldProps {
  index: number
  canRemove: boolean
  onRemove: () => void
}

const TelephoneContactField = ({
  index,
  canRemove,
  onRemove,
}: TelephoneContactFieldProps) => {
  const form = useFormContext<FormTelephoneEstablishmentType>()
  const { field: phone, fieldState: phoneState } = useController({
    control: form.control,
    name: `phones.${index}.phone`,
    defaultValue: '',
  })
  const { field: phoneType } = useController({
    control: form.control,
    name: `phones.${index}.type`,
    defaultValue: 'telephone',
  })
  const format = phoneFormats[phoneType.value]

  return (
    <Flex gap="2" flexDir={{ base: 'column', md: 'row' }}>
      <Field invalid={!!phoneState.error} errorText={phoneState.error?.message}>
        <PatternFormat
          name={phone.name}
          onBlur={phone.onBlur}
          getInputRef={phone.ref}
          aria-label="Número de contato"
          value={phone.value ?? ''}
          onValueChange={(values) => phone.onChange(values.value)}
          format={format.mask}
          placeholder={format.placeholder}
          mask="_"
          customInput={InputField}
        />
      </Field>

      <Flex mt="0.5" gap="2">
        {canRemove && (
          <Tooltip content="Remover telefone" showArrow>
            <IconButton
              type="button"
              alignSelf={{ base: 'center', xl: 'flex-start' }}
              size="xs"
              rounded="full"
              variant="ghost"
              colorPalette="red"
              onClick={() => onRemove()}
            >
              <Icon as={Trash2} boxSize="4" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip content="Telefone fixo" showArrow>
          <IconButton
            type="button"
            alignSelf={{ base: 'center', xl: 'flex-start' }}
            size="xs"
            rounded="full"
            variant={phoneType.value === 'telephone' ? 'subtle' : 'ghost'}
            onClick={() => phoneType.onChange('telephone')}
          >
            <Icon as={Phone} boxSize="4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Telefone celular" showArrow>
          <IconButton
            type="button"
            alignSelf={{ base: 'center', xl: 'flex-start' }}
            size="xs"
            rounded="full"
            variant={phoneType.value === 'cellphone' ? 'subtle' : 'ghost'}
            onClick={() => phoneType.onChange('cellphone')}
          >
            <Icon as={Smartphone} boxSize="4" />
          </IconButton>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default TelephoneContactField
