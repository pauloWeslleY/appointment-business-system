import {
  Alert,
  Box,
  Button,
  Card,
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Upload } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import z from 'zod'

import InputField from '@/components/input-field'
import Header from '@/components/layout/header'
import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'
import type { ServiceEstablishmentModel } from '@/shared/services/service-establishment/service-establishment.dto'
import { createServiceEstablishmentService } from '@/shared/services/service-establishment/service-establishment.service'
import {
  type UploadFileResponse,
  uploadFileToR2,
} from '@/shared/services/storage/upload.service'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/services/_pages/new/',
)({
  component: CreateServicePage,
})

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5 MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

const ServiceFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome é obrigatório'),
  description: z.string().trim().min(1, 'A descrição é obrigatória'),
  image: z
    .instanceof(FileList)
    .nullable()
    .transform((list) => list?.item(0) ?? null)
    .refine(
      (file) => !file || file.size <= MAX_IMAGE_SIZE,
      'A imagem deve possuir no máximo 5 MB',
    )
    .refine(
      (file) =>
        !file ||
        ACCEPTED_IMAGE_TYPES.includes(
          file.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
        ),
      'Utilize uma imagem JPG, PNG ou WebP',
    ),
  servicePriceInCents: z.number().min(1, 'O preço é obrigatório'),
})

type ServiceFormData = z.infer<typeof ServiceFormSchema>
type ServiceFormInput = z.input<typeof ServiceFormSchema>

function CreateServicePage() {
  const { establishmentId } = Route.useParams()

  const {
    mutate: createServiceEstablishment,
    isPending: isCreatingServiceEstablishment,
  } = useMutation<
    ServiceEstablishmentModel,
    Error,
    ServiceFormData & { establishmentId: string }
  >({
    mutationFn: async (data) => {
      let urlImage: UploadFileResponse | undefined

      if (data.image) {
        urlImage = await uploadFileToR2({
          id: data.establishmentId,
          file: data.image,
          folder: 'services',
        })
      }

      return createServiceEstablishmentService({
        ...data,
        imageUrl: urlImage?.key ?? null,
      })
    },
  })

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormInput, any, ServiceFormData>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: {
      name: '',
      description: '',
      image: null,
      servicePriceInCents: 0,
    },
  })

  const onSubmitCreateServiceEstablishment = (data: ServiceFormData) => {
    createServiceEstablishment(
      {
        ...data,
        establishmentId,
        servicePriceInCents: data.servicePriceInCents * 100,
      },
      {
        onSuccess: () => {
          reset()
          toaster.success({ title: 'Serviço cadastrado com sucesso' })
        },
        onError: (error) => {
          toaster.error({
            title: 'Erro ao cadastrar serviço',
            description: error.message,
          })
        },
      },
    )
  }

  return (
    <Box spaceY={{ base: '4', lg: '6' }}>
      <Header.Root>
        <HStack align="center">
          <Header.Button />

          <div>
            <Header.Title>Novo Serviço</Header.Title>
            <Header.SubTitle>
              Cadastre um novo serviço para o seu estabelecimento
            </Header.SubTitle>
          </div>
        </HStack>
      </Header.Root>

      <Card.Root
        variant="outline"
        rounded="xl"
        p="4"
        bg={{ base: 'white', _dark: 'gray.950/40' }}
        borderColor={{ base: 'gray.200', _dark: 'secondary.500/20' }}
      >
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
                  <FileUpload.Root
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
            </GridItem>

            <GridItem
              colSpan={{ base: 1, md: 2 }}
              placeSelf={{ base: 'center', md: 'end' }}
            >
              <Button
                type="submit"
                size="sm"
                rounded="xl"
                w="fit-content"
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
      </Card.Root>
    </Box>
  )
}
