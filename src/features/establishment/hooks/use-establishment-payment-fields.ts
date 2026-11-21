import { useFormContext, useWatch } from 'react-hook-form'

import { PaymentHttpsUrlSchema } from '../schemas/establishment-settings.schema'
import type { EstablishmentLinksForm } from '../types/establishment-links-form.type'
import { useEstablishmentPaymentQrCode } from './use-establishment-payment-qr-code'
import { useQrCodePreview } from './use-qr-code-preview'

interface UseEstablishmentPaymentFieldsParams {
  scopeIdentity: string
  isSaving: boolean
}

export function useEstablishmentPaymentFields({
  scopeIdentity,
  isSaving,
}: UseEstablishmentPaymentFieldsParams) {
  const paymentForm = useFormContext<EstablishmentLinksForm>()
  const paymentFormValues = useWatch({ control: paymentForm.control })
  const paymentFieldErrors = paymentForm.formState.errors

  const {
    qrFrameRef: paymentLinkQrCodeFrameRef,
    isGeneratingQrCode: isGeneratingPaymentLinkQrCode,
    generateQrCode: generatePaymentLinkQrCode,
    onPaymentLinkChange: changePaymentLink,
    onQrCodeFileChange: changeQrCodeFile,
  } = useEstablishmentPaymentQrCode({ scopeIdentity, isSaving })

  const qrCodeFile = paymentFormValues.qrCodeFile
  const qrCodeFilePreviewRef = useQrCodePreview(qrCodeFile)

  const paymentLink = paymentFormValues.paymentLink?.trim() ?? ''
  const isValidPaymentLink =
    PaymentHttpsUrlSchema.safeParse(paymentLink).success

  const paymentQrCodeUrl = paymentFormValues.paymentQrCodeUrl?.trim() ?? ''
  const isValidPaymentQrCodeUrl =
    PaymentHttpsUrlSchema.safeParse(paymentQrCodeUrl).success
  const hasQrCodeFile = Boolean(qrCodeFile)
  const qrCodePreviewImageSrc =
    hasQrCodeFile || !isValidPaymentQrCodeUrl ? undefined : paymentQrCodeUrl
  const hasQrCodePreview = hasQrCodeFile || isValidPaymentQrCodeUrl

  const isBookingDepositRequired = Boolean(
    paymentFormValues.requiresBookingDeposit,
  )
  const isPaymentQrCodeUrlRequired = isBookingDepositRequired && !hasQrCodeFile

  return {
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
  }
}
