import {
  Button,
  Card,
  chakra,
  HStack,
  Icon,
  RadioGroup,
  SimpleGrid,
} from '@chakra-ui/react'
import { Settings2 } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useFormUpdateOrganizationProfile } from '../hooks/use-form-update-organization-profile'

const FormUpdateOrganizationProfile = () => {
  const {
    errors,
    control,
    isPendingUpdateOrganizationProfile,
    filteredStatusOptions,
    register,
    handleSubmit,
    handleUpdateOrganizationProfile,
  } = useFormUpdateOrganizationProfile()

  return (
    <Card.Root variant="outline" h="fit" css={cardSectionCss}>
      <Card.Header p="0" mb="4">
        <Card.Title
          display="flex"
          alignItems="center"
          gap="2"
          color={{ _light: 'sea.600', _dark: 'sea.100' }}
        >
          <Icon
            as={Settings2}
            color={{ _light: 'teal.700', _dark: 'teal.400' }}
          />
          Editar perfil empresarial.
        </Card.Title>
        <Card.Description>
          Atualize as informações do perfil empresarial, como nome, telefone e
          razão social. Certifique-se de fornecer informações precisas e
          atualizadas para manter os registros corretos.
        </Card.Description>
      </Card.Header>

      <chakra.form
        display="flex"
        flexDirection="column"
        gap="2"
        w="full"
        onSubmit={handleSubmit(handleUpdateOrganizationProfile)}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          <Field
            label="Razão social"
            invalid={!!errors?.legalName}
            errorText={errors?.legalName?.message}
          >
            <InputField
              {...register('legalName')}
              placeholder="Ex: Minha Empresa LTDA"
            />
          </Field>

          <Field
            label="Nome fantasia"
            invalid={!!errors?.tradeName}
            errorText={errors?.tradeName?.message}
          >
            <InputField
              {...register('tradeName')}
              placeholder="Ex: Minha Empresa"
            />
          </Field>

          <Field
            label="E-mail"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <InputField
              {...register('email')}
              placeholder="email@example.com"
            />
          </Field>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Field
                label="Telefone"
                invalid={!!errors.phone}
                errorText={errors.phone?.message}
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

          <Field
            label="Status"
            invalid={!!errors.status}
            errorText={errors.status?.message}
            gridColumn="span 2"
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <RadioGroup.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                >
                  <HStack gap="6">
                    {filteredStatusOptions.map((item) => (
                      <RadioGroup.Item key={item.value} value={item.value}>
                        <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </HStack>
                </RadioGroup.Root>
              )}
            />
          </Field>
        </SimpleGrid>

        <Button
          alignSelf="flex-end"
          type="submit"
          size="sm"
          rounded="lg"
          w="fit"
          loading={isPendingUpdateOrganizationProfile}
        >
          Salvar
        </Button>
      </chakra.form>
    </Card.Root>
  )
}

export default FormUpdateOrganizationProfile
