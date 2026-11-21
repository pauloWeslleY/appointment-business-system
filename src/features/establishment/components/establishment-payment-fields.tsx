import {
  Box,
  Button,
  Fieldset,
  FileUpload,
  For,
  Grid,
  Image,
  QrCode,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react'
import { Upload } from 'lucide-react'
import { Controller } from 'react-hook-form'

import FileUploadCardItem from '@/components/file-upload-item'
import InputField from '@/components/input-field'
import { Field } from '@/components/ui/field'
import { cardSectionCss } from '@/theme/styles/global-styles'

import { useEstablishmentPaymentFields } from '../hooks/use-establishment-payment-fields'

interface EstablishmentPaymentFieldsProps {
  scopeIdentity: string
  isSaving: boolean
}

const EstablishmentPaymentFields = ({
  scopeIdentity,
  isSaving,
}: EstablishmentPaymentFieldsProps) => {
  const {
    paymentForm,
    paymentFieldErrors,
    paymentLink,
    isValidPaymentLink,
    isBookingDepositRequired,
    isPaymentQrCodeUrlRequired,
    qrCodeFilePreviewRef,
    qrCodePreviewImageSrc,
    hasQrCodePreview,
    paymentLinkQrCodeFrameRef,
    isGeneratingPaymentLinkQrCode,
    generatePaymentLinkQrCode,
    changePaymentLink,
    changeQrCodeFile,
  } = useEstablishmentPaymentFields({ scopeIdentity, isSaving })

  return (
    <Fieldset.Root
      css={cardSectionCss}
      borderWidth="1px"
      shadow="none"
      disabled={isGeneratingPaymentLinkQrCode}
    >
      <Fieldset.Legend fontSize="lg">
        Sinal e formas de pagamento
      </Fieldset.Legend>
      <Fieldset.HelperText mt="0">
        Configure onde o cliente deve pagar o sinal. A confirmação do
        recebimento é feita pela sua equipe.
      </Fieldset.HelperText>

      <Fieldset.Content gap="5">
        <Controller
          control={paymentForm.control}
          name="requiresBookingDeposit"
          render={({ field: requiresBookingDepositField }) => (
            <Switch.Root
              checked={requiresBookingDepositField.value}
              onCheckedChange={(switchCheckedDetails) =>
                requiresBookingDepositField.onChange(
                  switchCheckedDetails.checked,
                )
              }
              colorPalette="brand"
            >
              <Switch.HiddenInput
                name={requiresBookingDepositField.name}
                onBlur={requiresBookingDepositField.onBlur}
                ref={requiresBookingDepositField.ref}
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
            required={isBookingDepositRequired}
            invalid={Boolean(paymentFieldErrors.paymentLink)}
            errorText={paymentFieldErrors.paymentLink?.message}
            helperText="Cole o link HTTPS fornecido pelo seu meio de pagamento."
          >
            <InputField
              {...paymentForm.register('paymentLink')}
              onChange={(paymentLinkChangeEvent) =>
                changePaymentLink(paymentLinkChangeEvent.target.value)
              }
              type="url"
              placeholder="https://..."
              autoComplete="off"
              maxLength={2048}
            />
          </Field>

          <Field
            label="URL da imagem do QR Code"
            required={isPaymentQrCodeUrlRequired}
            invalid={Boolean(paymentFieldErrors.paymentQrCodeUrl)}
            errorText={paymentFieldErrors.paymentQrCodeUrl?.message}
            helperText="Use uma URL HTTPS da imagem, envie um arquivo ou gere o QR Code do link abaixo."
          >
            <InputField
              {...paymentForm.register('paymentQrCodeUrl')}
              type="url"
              placeholder="https://.../qr-code.png"
              autoComplete="off"
              maxLength={2048}
            />
          </Field>
        </Grid>

        <Field
          label="Enviar imagem do QR Code"
          invalid={Boolean(paymentFieldErrors.qrCodeFile)}
          errorText={paymentFieldErrors.qrCodeFile?.message}
          helperText="PNG, JPG ou WebP de até 5 MB."
        >
          <Controller
            control={paymentForm.control}
            name="qrCodeFile"
            render={() => (
              <FileUpload.Root placeContent="flex-end">
                <FileUpload.HiddenInput
                  onChange={(qrCodeFileChangeEvent) =>
                    changeQrCodeFile(
                      qrCodeFileChangeEvent.target?.files?.[0] ?? null,
                    )
                  }
                />
                <FileUpload.Trigger asChild>
                  <Button variant="outline" size="sm" rounded="lg">
                    <Upload /> Selecionar arquivo
                  </Button>
                </FileUpload.Trigger>

                <FileUpload.ItemGroup mt="1" gap="2">
                  <FileUpload.Context>
                    {({ acceptedFiles: acceptedQrCodeFiles }) => (
                      <For each={acceptedQrCodeFiles}>
                        {(qrCodeFile) => (
                          <FileUploadCardItem
                            key={qrCodeFile.name}
                            file={qrCodeFile}
                          />
                        )}
                      </For>
                    )}
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
          {hasQrCodePreview && (
            <Box>
              <Text fontSize="sm" mb="2">
                Imagem a ser salva
              </Text>
              <Image
                ref={qrCodeFilePreviewRef}
                src={qrCodePreviewImageSrc}
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
                <QrCode.Frame
                  ref={paymentLinkQrCodeFrameRef}
                  bg="white"
                  color="black"
                  p="2"
                >
                  <QrCode.Pattern fill="#000000" />
                </QrCode.Frame>
              </QrCode.Root>
              <Button
                rounded="lg"
                type="button"
                size="sm"
                variant="outline"
                onClick={generatePaymentLinkQrCode}
                loading={isGeneratingPaymentLinkQrCode}
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
