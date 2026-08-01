import {
  Alert,
  Box,
  Button,
  chakra,
  FileUpload,
  Flex,
  GridItem,
  HStack,
  Icon,
  Image,
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

import { useFormUpdateServiceEstablishment } from '../hooks/use-form-update-service-establishment'

const FormUpdateServiceEstablishment = () => {
  const {
    errors,
    control,
    register,
    handleSubmit,
    serviceEstablishment,
    isUpdatingServiceEstablishment,
    onSubmitUpdateServiceEstablishment,
  } = useFormUpdateServiceEstablishment()

  return (
    <chakra.form
      w="full"
      display="flex"
      flexDirection="column"
      gap="4"
      onSubmit={handleSubmit(onSubmitUpdateServiceEstablishment)}
    >
      <SimpleGrid columns={{ base: 1, md: 4 }} gap="4" w="full">
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
                value={field.value / 100}
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

        <GridItem colSpan={{ base: 1, md: 4 }} asChild>
          <HStack>
            <Text flexShrink="0">Imagem do serviço</Text>
            <Separator
              flex="1"
              borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
            />
          </HStack>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 4 }}>
          <Flex gap="2">
            {serviceEstablishment?.imageUrl && (
              <Box flex="1">
                <Image
                  border="1px solid"
                  borderColor={{
                    base: 'gray.200',
                    _dark: 'secondary.500/20',
                  }}
                  rounded="xl"
                  w="full"
                  h="48"
                  fit="contain"
                  src={serviceEstablishment.imageUrl}
                />
              </Box>
            )}

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FileUpload.Root
                  flex={serviceEstablishment?.imageUrl ? '1' : 'inherit'}
                  alignItems="stretch"
                  maxFiles={10}
                  rounded="xl"
                >
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
          </Flex>
        </GridItem>
      </SimpleGrid>

      <Button
        type="submit"
        size="sm"
        rounded="xl"
        w="fit"
        alignSelf="flex-end"
        colorPalette="primary"
        variant="subtle"
        loading={isUpdatingServiceEstablishment}
      >
        Editar
      </Button>

      {isUpdatingServiceEstablishment && (
        <Alert.Root
          borderStartWidth="3px"
          borderStartColor="colorPalette.600"
          mt="2"
        >
          <Alert.Indicator>
            <Spinner size="sm" />
          </Alert.Indicator>
          <Alert.Title>Atualizando serviço...</Alert.Title>
        </Alert.Root>
      )}
    </chakra.form>
  )
}

export default FormUpdateServiceEstablishment
