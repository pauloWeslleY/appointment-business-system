import {
  Alert,
  Box,
  Button,
  chakra,
  FileUpload,
  GridItem,
  HStack,
  Icon,
  Separator,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { Upload } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'

import { useFormCreateServiceEstablishment } from '../hooks/use-form-create-service-establishment'

const FormCreateServiceEstablishment = () => {
  const {
    control,
    errors,
    isCreatingServiceEstablishment,
    register,
    handleSubmit,
    onSubmitCreateServiceEstablishment,
  } = useFormCreateServiceEstablishment()

  return (
    <chakra.form
      w="full"
      onSubmit={handleSubmit(onSubmitCreateServiceEstablishment)}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
        <Field
          gridColumn={{ base: 'span 1' }}
          invalid={!!errors.name}
          errorText={errors.name?.message}
        >
          <InputField
            {...register('name')}
            placeholder="Digite o nome do serviço"
          />
        </Field>

        <Controller
          control={control}
          name="servicePriceInCents"
          render={({ field }) => (
            <Field
              invalid={Boolean(errors.servicePriceInCents)}
              errorText={errors.servicePriceInCents?.message}
            >
              <NumericFormat
                value={field.value}
                onValueChange={(value) => field.onChange(value.floatValue)}
                decimalScale={2}
                fixedDecimalScale
                decimalSeparator=","
                allowNegative={false}
                allowLeadingZeros={false}
                thousandSeparator="."
                customInput={InputField}
                prefix="R$"
              />
            </Field>
          )}
        />

        <Field
          gridColumn={{ base: 'span 1', md: 'span 2' }}
          invalid={!!errors.description}
          errorText={errors.description?.message}
        >
          <InputField
            {...register('description')}
            placeholder="Digite a descrição do serviço"
          />
        </Field>

        <GridItem colSpan={{ base: 1, md: 2 }} asChild>
          <HStack>
            <Separator
              flex="1"
              borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            />
            <Text flexShrink="0">Upload</Text>
            <Separator
              flex="1"
              borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            />
          </HStack>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Text pb="4">Imagem do serviço</Text>

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <FileUpload.Root alignItems="stretch" maxFiles={10} rounded="xl">
                <FileUpload.HiddenInput
                  onChange={(e) => field.onChange(e.target.files)}
                />
                <FileUpload.Dropzone
                  rounded="xl"
                  bg="gray.700/10"
                  borderColor={{
                    base: 'gray.200',
                    _dark: 'secondary.500/20',
                  }}
                >
                  <Icon size="md" color="fg.muted">
                    <Upload />
                  </Icon>
                  <FileUpload.DropzoneContent>
                    <Box>Drag and drop files here</Box>
                    <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List />
              </FileUpload.Root>
            )}
          />
        </GridItem>

        <GridItem
          colSpan={{ base: 1, md: 2 }}
          placeSelf={{ base: 'center', md: 'end' }}
        >
          <Button
            type="submit"
            size="sm"
            rounded="xl"
            w="fit"
            colorPalette="primary"
            variant="subtle"
            loading={isCreatingServiceEstablishment}
          >
            Cadastrar serviço
          </Button>
        </GridItem>
      </SimpleGrid>

      {isCreatingServiceEstablishment && (
        <Alert.Root
          borderStartWidth="3px"
          borderStartColor="colorPalette.600"
          mt="2"
        >
          <Alert.Indicator>
            <Spinner size="sm" />
          </Alert.Indicator>
          <Alert.Title>Cadastrando serviço...</Alert.Title>
        </Alert.Root>
      )}
    </chakra.form>
  )
}

export default FormCreateServiceEstablishment
