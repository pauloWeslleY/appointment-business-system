import { type ListCollection, Portal, Select, Spinner } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { Field } from '@/components/ui/field'
import { contentCss } from '@/theme/styles/global-styles'

interface SelectOption {
  label: string
  value: string
}

interface SelectFieldAppointmentProps {
  label: string
  placeholder: string
  collection: ListCollection<SelectOption>
  value: string[]
  onValueChange: (value: string[]) => void
  errorText?: string
  helperText?: ReactNode
  required?: boolean
  disabled?: boolean
  loading?: boolean
  clearable?: boolean
}

const SelectFieldAppointment = ({
  label,
  placeholder,
  collection,
  value,
  onValueChange,
  errorText,
  helperText,
  required,
  disabled,
  loading,
  clearable,
}: SelectFieldAppointmentProps) => {
  return (
    <Field
      label={label}
      required={required}
      invalid={Boolean(errorText)}
      errorText={errorText}
      helperText={helperText}
    >
      <Select.Root
        w="full"
        size="sm"
        variant="subtle"
        collection={collection}
        value={value}
        disabled={disabled || loading}
        onValueChange={(e) => onValueChange(e.value)}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger
            rounded="xl"
            bg={{ base: 'blackAlpha.100', _dark: 'gray.800/40' }}
          >
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            {loading && (
              <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />
            )}
            {!loading && clearable && <Select.ClearTrigger />}
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content css={contentCss}>
              {collection.items.map((item) => (
                <Select.Item
                  key={item.value}
                  item={item}
                  rounded="xl"
                  cursor="pointer"
                  _hover={{
                    bg: { base: 'gray.100', _dark: 'secondary.600' },
                  }}
                >
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Field>
  )
}

export default SelectFieldAppointment
