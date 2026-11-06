import {
  Box,
  Button,
  Fieldset,
  FileUpload,
  Grid,
  Image,
  QrCode,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react'
import { Upload } from 'lucide-react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import FileUploadCardItem from '@/components/file-upload-item'
import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useEstablishmentPaymentQrCode } from '../hooks/use-establishment-payment-qr-code'
import { useQrCodePreview } from '../hooks/use-qr-code-preview'
import { PaymentHttpsUrlSchema } from '../schemas/establishment-settings.schema'
import type { EstablishmentLinksForm } from '../types/establishment-links-form.type'

interface EstablishmentPaymentFieldsProps {
  scopeIdentity: string
  isSaving: boolean
}

const EstablishmentPaymentFields = ({
  scopeIdentity,
  isSaving,
}: EstablishmentPaymentFieldsProps) => {
  const form = useFormContext<EstablishmentLinksForm>()
  const values = useWatch({ control: form.control })
  const errors = form.formState.errors

  const {
    qrFrameRef,
    isGeneratingQrCode,
    generateQrCode,
    onPaymentLinkChange,
    onQrCodeFileChange,
  } = useEstablishmentPaymentQrCode({ scopeIdentity, isSaving })

  const paymentLink = values.paymentLink?.trim() ?? ''
  const isValidPaymentLink =
    PaymentHttpsUrlSchema.safeParse(paymentLink).success
  const previewRef = useQrCodePreview(values.qrCodeFile)
  const remotePreview = values.paymentQrCodeUrl?.trim() ?? ''
  const previewUrl = PaymentHttpsUrlSchema.safeParse(remotePreview).success
    ? remotePreview
    : undefined
  const hasPreview = Boolean(values.qrCodeFile || previewUrl)

  return (
    <Fieldset.Root
      css={cardSectionCss}
      borderWidth="1px"
      disabled={isGeneratingQrCode}
    >
      <Fieldset.Legend fontSize="lg">
        Sinal e formas de pagamento
      </Fieldset.Legend>
      <Fieldset.HelperText>
        Configure onde o cliente deve pagar o sinal. A confirmação do
        recebimento é feita pela sua equipe.
      </Fieldset.HelperText>

      <Fieldset.Content gap="5">
        <Controller
          control={form.control}
          name="requiresBookingDeposit"
          render={({ field }) => (
            <Switch.Root
              checked={field.value}
              onCheckedChange={(details) => field.onChange(details.checked)}
              colorPalette="brand"
            >
              <Switch.HiddenInput
                name={field.name}
                onBlur={field.onBlur}
                ref={field.ref}
              />
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Label>Exigir sinal para o agendamento</Switch.Label>
            </Switch.Root>
          )}
        />

        <Grid
          templateColumns="repeat(auto-fit, minmax(min(250px, 100%), 1fr))"
          gap="5"
        >
          <Field
            label="Link de pagamento"
            required={values.requiresBookingDeposit}
            invalid={Boolean(errors.paymentLink)}
            errorText={errors.paymentLink?.message}
            helperText="Cole o link HTTPS fornecido pelo seu meio de pagamento."
          >
            <InputField
              {...form.register('paymentLink')}
              onChange={(event) => onPaymentLinkChange(event.target.value)}
              type="url"
              placeholder="https://..."
              autoComplete="off"
              maxLength={2048}
            />
          </Field>

          <Field
            label="URL da imagem do QR Code"
            required={values.requiresBookingDeposit && !values.qrCodeFile}
            invalid={Boolean(errors.paymentQrCodeUrl)}
            errorText={errors.paymentQrCodeUrl?.message}
            helperText="Use uma URL HTTPS da imagem, envie um arquivo ou gere o QR Code do link abaixo."
          >
            <InputField
              {...form.register('paymentQrCodeUrl')}
              type="url"
              placeholder="https://.../qr-code.png"
              autoComplete="off"
              maxLength={2048}
            />
          </Field>
        </Grid>

        <Field
          label="Enviar imagem do QR Code"
          invalid={Boolean(errors.qrCodeFile)}
          errorText={errors.qrCodeFile?.message}
          helperText="PNG, JPG ou WebP de até 5 MB."
        >
          <Controller
            control={form.control}
            name="qrCodeFile"
            render={() => (
              <FileUpload.Root placeContent="flex-end">
                <FileUpload.HiddenInput
                  onChange={(event) =>
                    onQrCodeFileChange(event.target?.files?.[0] ?? null)
                  }
                />
                <FileUpload.Trigger asChild>
                  <Button variant="outline" size="sm" rounded="lg">
                    <Upload /> Selecionar arquivo
                  </Button>
                </FileUpload.Trigger>

                <FileUpload.ItemGroup mt="1" gap="2">
                  <FileUpload.Context>
                    {({ acceptedFiles }) =>
                      acceptedFiles.map((file) => (
                        <FileUploadCardItem key={file.name} file={file} />
                      ))
                    }
                  </FileUpload.Context>
                </FileUpload.ItemGroup>
              </FileUpload.Root>
            )}
          />
        </Field>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap="6"
          align="start"
          flexWrap="wrap"
        >
          {hasPreview && (
            <Box>
              <Text fontSize="sm" mb="2">
                Imagem a ser salva
              </Text>
              <Image
                ref={previewRef}
                src={values.qrCodeFile ? undefined : previewUrl}
                alt="Prévia do QR Code de pagamento"
                boxSize="48"
                objectFit="contain"
                bg="white"
                p="3"
                borderRadius="lg"
              />
            </Box>
          )}

          {isValidPaymentLink && (
            <Stack align="start">
              <Text fontSize="sm" overflowWrap="anywhere">
                QR Code do link informado
              </Text>
              <QrCode.Root value={paymentLink} encoding={{ ecc: 'M' }}>
                <QrCode.Frame ref={qrFrameRef} bg="white" color="black" p="2">
                  <QrCode.Pattern fill="#000000" />
                </QrCode.Frame>
              </QrCode.Root>
              <Button
                rounded="lg"
                type="button"
                size="sm"
                variant="outline"
                onClick={generateQrCode}
                loading={isGeneratingQrCode}
              >
                Usar QR Code deste link
              </Button>
              <Text fontSize="xs">A imagem gerada será enviada ao salvar.</Text>
            </Stack>
          )}
        </Stack>
      </Fieldset.Content>
    </Fieldset.Root>
  )
}

export default EstablishmentPaymentFields
