import {
  Alert,
  Box,
  Button,
  Card,
  chakra,
  Checkbox,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { SaveIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { cardSectionCss, inputFieldStyles } from '@/theme/styles/global-styles'

import { useFormChangePassword } from '../hooks/use-form-change-password'

const FormChangePassword = () => {
  const { form, handleChangePassword } = useFormChangePassword()
  const { errors, isSubmitting } = form.formState

  return (
    <Card.Root variant="outline" css={cardSectionCss} h="fit">
      <chakra.form
        onSubmit={form.handleSubmit(handleChangePassword)}
        noValidate
      >
        <Stack gap="4">
          <Stack gap="1">
            <Text fontSize="lg" fontWeight="bold">
              Alterar senha
            </Text>
            <Text fontSize="sm" color="fg.muted">
              Informe sua senha atual para definir uma nova senha de acesso.
            </Text>
          </Stack>
          <chakra.fieldset
            disabled={isSubmitting}
            border="0"
            p="0"
            m="0"
            minW="0"
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              <Field
                label="Senha atual"
                gridColumn="1 / -1"
                required
                invalid={!!errors.currentPassword}
                errorText={errors.currentPassword?.message}
              >
                <PasswordInput
                  {...form.register('currentPassword')}
                  autoComplete="current-password"
                  placeholder="Digite sua senha atual"
                  size="sm"
                  variant="subtle"
                  {...inputFieldStyles}
                />
              </Field>
              <Field
                label="Nova senha"
                helperText="Use pelo menos 10 caracteres."
                required
                invalid={!!errors.newPassword}
                errorText={errors.newPassword?.message}
              >
                <PasswordInput
                  {...form.register('newPassword')}
                  autoComplete="new-password"
                  placeholder="Digite a nova senha"
                  size="sm"
                  variant="subtle"
                  {...inputFieldStyles}
                />
              </Field>
              <Field
                label="Confirmar nova senha"
                required
                invalid={!!errors.confirmPassword}
                errorText={errors.confirmPassword?.message}
              >
                <PasswordInput
                  {...form.register('confirmPassword')}
                  autoComplete="new-password"
                  placeholder="Repita a nova senha"
                  size="sm"
                  variant="subtle"
                  {...inputFieldStyles}
                />
              </Field>
              <Box gridColumn={{ base: 'span 1', md: 'span 2' }}>
                <Controller
                  control={form.control}
                  name="revokeOtherSessions"
                  render={({ field }) => (
                    <Checkbox.Root
                      colorPalette="brand"
                      size="sm"
                      disabled={isSubmitting}
                      checked={field.value}
                      onCheckedChange={({ checked }) =>
                        field.onChange(checked === true)
                      }
                    >
                      <Checkbox.HiddenInput
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                      />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label fontWeight="normal">
                        Encerrar sessões em outros dispositivos
                      </Checkbox.Label>
                    </Checkbox.Root>
                  )}
                />
              </Box>
              <Box
                gridColumn={{ base: 'span 1', md: 'span 2' }}
                placeSelf="end"
              >
                <Button
                  type="submit"
                  size="sm"
                  rounded="lg"
                  colorPalette="brand"
                  loading={isSubmitting}
                  loadingText="Alterando senha..."
                >
                  <Icon as={SaveIcon} />
                  Alterar senha
                </Button>
              </Box>
            </SimpleGrid>
          </chakra.fieldset>
          {errors.root && (
            <Alert.Root status="error" rounded="lg">
              <Alert.Indicator />
              <Alert.Title>{errors.root.message}</Alert.Title>
            </Alert.Root>
          )}
        </Stack>
      </chakra.form>
    </Card.Root>
  )
}

export default FormChangePassword
