import {
  Alert,
  Box,
  Button,
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
import { inputStyles } from '@/theme/styles/global-styles'

import { useFormChangePassword } from '../hooks/use-form-change-password'

const FormChangePassword = () => {
  const { form, handleChangePassword } = useFormChangePassword()
  const { errors, isSubmitting } = form.formState

  return (
    <chakra.form onSubmit={form.handleSubmit(handleChangePassword)} noValidate>
      <Stack gap="4">
        <Text color="fg.muted">
          Informe sua senha atual e escolha uma nova senha com pelo menos 10
          caracteres.
        </Text>
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
              required
              invalid={!!errors.currentPassword}
              errorText={errors.currentPassword?.message}
            >
              <PasswordInput
                {...form.register('currentPassword')}
                autoComplete="current-password"
                placeholder="Digite sua senha atual"
                size="sm"
                css={inputStyles}
              />
            </Field>
            <Box display={{ base: 'none', md: 'block' }} />
            <Field
              label="Nova senha"
              required
              invalid={!!errors.newPassword}
              errorText={errors.newPassword?.message}
            >
              <PasswordInput
                {...form.register('newPassword')}
                autoComplete="new-password"
                placeholder="Digite a nova senha"
                size="sm"
                css={inputStyles}
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
                css={inputStyles}
              />
            </Field>
            <Box gridColumn={{ base: 'span 1', md: 'span 2' }}>
              <Controller
                control={form.control}
                name="revokeOtherSessions"
                render={({ field }) => (
                  <Checkbox.Root
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
                    <Checkbox.Label>
                      Encerrar sessões em outros dispositivos
                    </Checkbox.Label>
                  </Checkbox.Root>
                )}
              />
            </Box>
            <Box gridColumn={{ base: 'span 1', md: 'span 2' }} placeSelf="end">
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
  )
}

export default FormChangePassword
