import { Button, chakra, Portal, Select, Skeleton } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import {
  cardSectionCss,
  contentCss,
  inputFieldStyles,
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
    isLoadingActiveMember,
    errors,
    control,
    handleSubmit,
    handleFormSubmitUpdateRoleMember,
  } = useFormUpadteRoleMember(memberId)

  if (isLoadingActiveMember) {
    return <Skeleton height="80px" rounded="xl" />
  }

  return (
    <chakra.form
      onSubmit={handleSubmit(handleFormSubmitUpdateRoleMember)}
      display="flex"
      flexDirection="column"
      gap="4"
      border="1px solid"
      {...cardSectionCss}
      p="2"
      shadow="none"
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
                <Select.Trigger css={inputFieldStyles}>
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
        colorPalette="brand"
        loading={isPendingUpdateRoleMember}
      >
        Salvar
      </Button>
    </chakra.form>
  )
}

export default FormUpadteRoleMember
