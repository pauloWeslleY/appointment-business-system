import { Button, chakra, Portal, Select } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import {
  cardSectionCss,
  contentCss,
  menuItemCss,
} from '@/theme/styles/global-styles'

import { useFormUpadteRoleMember } from '../hooks/use-form-update-role-member'

interface FormUpadteRoleMemberProps {
  memberId?: string
}

const FormUpadteRoleMember = ({ memberId }: FormUpadteRoleMemberProps) => {
  const {
    loadSelectRoleUpdateMember,
    isPendingUpdateRoleMember,
    errors,
    control,
    handleSubmit,
    handleFormSubmitUpdateRoleMember,
  } = useFormUpadteRoleMember(memberId)

  return (
    <chakra.form
      onSubmit={handleSubmit(handleFormSubmitUpdateRoleMember)}
      display="flex"
      flexDirection="column"
      gap="4"
      border="1px solid"
      {...cardSectionCss}
      p="2"
    >
      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <Field
            label="Papel"
            invalid={Boolean(errors.role)}
            errorText={errors.role?.message}
          >
            <Select.Root
              w="full"
              size="sm"
              variant="subtle"
              collection={loadSelectRoleUpdateMember}
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
                  <Select.ValueText placeholder="Selecione o papel" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content css={contentCss}>
                    {loadSelectRoleUpdateMember.items.map((role) => (
                      <Select.Item
                        key={role.value}
                        item={role}
                        css={menuItemCss}
                      >
                        {role.label}
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

      <Button
        type="submit"
        size="xs"
        rounded="lg"
        alignSelf="flex-end"
        loading={isPendingUpdateRoleMember}
      >
        Salvar
      </Button>
    </chakra.form>
  )
}

export default FormUpadteRoleMember
