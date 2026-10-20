import {
  Alert,
  Box,
  Button,
  chakra,
  Flex,
  Group,
  Input,
} from '@chakra-ui/react'
import { CheckIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { Field } from '@/components/ui/field'
import { inputStyles } from '@/theme/styles/global-styles'

import { useFormCreateOrganizationProfile } from '../hooks/use-form-create-organization-profile'

const FormCreateOrganizationProfile = () => {
  const {
    control,
    errors,
    isPendingCreateOrganizationProfile,
    register,
    handleSubmit,
    handleCreateOrganizationProfile,
    syncNameFromTradeName,
  } = useFormCreateOrganizationProfile()

  return (
    <chakra.form
      autoComplete="off"
      onSubmit={handleSubmit(handleCreateOrganizationProfile)}
      w="full"
      display="flex"
      flexDir="column"
      gap={{ base: '4', md: '6' }}
    >
      <Flex
        aria-label="form-create-organization-profile"
        flexDir="column"
        gap={{ base: '4' }}
      >
        <Box
          w="full"
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={{ base: '4' }}
        >
          <Field
            label="Razão social"
            optionalText=" *"
            invalid={!!errors.profile?.legalName}
            errorText={errors.profile?.legalName?.message}
          >
            <Input
              {...register('profile.legalName')}
              placeholder="Ex: Minha Empresa LTDA"
              size="sm"
              css={inputStyles}
            />
          </Field>

          <Field
            label="Nome fantasia"
            optionalText=" *"
            invalid={!!errors.profile?.tradeName}
            errorText={errors.profile?.tradeName?.message}
          >
            <Input
              {...register('profile.tradeName')}
              placeholder="Ex: Minha Empresa"
              size="sm"
              css={inputStyles}
            />
          </Field>

          <Field
            label="E-mail"
            optionalText=" *"
            invalid={!!errors.profile?.email}
            errorText={errors.profile?.email?.message}
          >
            <Input
              {...register('profile.email')}
              placeholder="contato@minhaempresa.com"
              size="sm"
              css={inputStyles}
            />
          </Field>

          <Controller
            name="profile.phone"
            control={control}
            render={({ field }) => (
              <Field
                label="Telefone comercial"
                optionalText=" *"
                invalid={!!errors.profile?.phone}
                errorText={errors.profile?.phone?.message}
              >
                <PatternFormat
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.value)}
                  format="(##) #####-####"
                  placeholder="(00) 00000-0000"
                  mask="_"
                  size="sm"
                  customInput={Input}
                  css={inputStyles}
                />
              </Field>
            )}
          />
        </Box>

        <Field
          label="Nome do perfil empresarial"
          optionalText=" *"
          invalid={!!errors.name}
          errorText={errors.name?.message}
          helperText="Nome utilizado para identificar sua empresa no sistema."
        >
          <Group attached w="full">
            <Input
              {...register('name')}
              placeholder="Ex: Minha Empresa"
              size="sm"
              css={inputStyles}
            />
            <Button size="sm" rounded="lg" onClick={syncNameFromTradeName}>
              Utilizar nome fantasia
            </Button>
          </Group>
        </Field>
      </Flex>

      {errors.root && (
        <Alert.Root status="error" variant="subtle" rounded="lg">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Erro</Alert.Title>
            <Alert.Description>{errors.root.message}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      <Button
        type="submit"
        rounded="lg"
        loading={isPendingCreateOrganizationProfile}
        variant="solid"
        colorPalette="brand"

        alignSelf="flex-end"
      >
        <CheckIcon size="5" />
        Criar perfil empresarial
      </Button>
    </chakra.form>
  )
}

export default FormCreateOrganizationProfile
