import { Button, chakra, Portal, Select } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import {
  cardSectionCss,
  contentCss,
  menuItemCss,
} from '@/theme/styles/global-styles'

import { useFormUpadteStatusMember } from '../hooks/use-form-update-status-member'

interface FormUpadteStatusMemberProps {
  memberId?: string
}

const FormUpadteStatusMember = ({ memberId }: FormUpadteStatusMemberProps) => {
  const {
    loadSelectStatusUpdateMember,
    errors,
    control,
    handleSubmit,
    handleFormSubmitUpdateStatusMember,
  } = useFormUpadteStatusMember(memberId)

  return (
    <chakra.form
      onSubmit={handleSubmit(handleFormSubmitUpdateStatusMember)}
      display="flex"
      flexDirection="column"
      gap="4"
      border="1px solid"
      {...cardSectionCss}
      p="2"
    >
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <Field
            label="Status"
            invalid={Boolean(errors.status)}
            errorText={errors.status?.message}
          >
            <Select.Root
              w="full"
              size="sm"
              variant="subtle"
              collection={loadSelectStatusUpdateMember}
              value={[...field.value]}
              onValueChange={({ value }) => field.onChange(value)}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger
                  rounded="xl"
                  bg={{
                    _light: 'blackAlpha.100',
                    _dark: 'gray.800/40',
                  }}
                >
                  <Select.ValueText placeholder="Selecione o status" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content css={contentCss}>
                    {loadSelectStatusUpdateMember.items.map((status) => (
                      <Select.Item
                        key={status.value}
                        item={status}
                        css={menuItemCss}
                      >
                        {status.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Field>
        )}
      />

      <Button type="submit" size="xs" rounded="lg" alignSelf="flex-end">
        Salvar
      </Button>
    </chakra.form>
  )
}

export default FormUpadteStatusMember
