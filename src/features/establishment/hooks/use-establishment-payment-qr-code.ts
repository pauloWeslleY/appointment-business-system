import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'

import type { EstablishmentLinksForm } from '../types/establishment-links-form.type'
import { createQrCodeImageFile } from '../utils/qr-code-image'

interface UseEstablishmentPaymentQrCodeParams {
  scopeIdentity: string
  isSaving: boolean
}

export function useEstablishmentPaymentQrCode({
  scopeIdentity,
  isSaving,
}: UseEstablishmentPaymentQrCodeParams) {
  const form = useFormContext<EstablishmentLinksForm>()
  const [isGeneratingQrCode, setGeneratingQrCode] = useState(false)
  const qrFrameRef = useRef<SVGSVGElement>(null)
  const generatedQrCodeLink = useRef<string | undefined>(undefined)
  const activeScopeIdentity = useRef(scopeIdentity)

  useEffect(() => {
    activeScopeIdentity.current = scopeIdentity
    generatedQrCodeLink.current = undefined
  }, [scopeIdentity])

  async function generateQrCode() {
    if (!qrFrameRef.current || isGeneratingQrCode || isSaving) {
      return
    }

    const generationScopeIdentity = activeScopeIdentity.current

    setGeneratingQrCode(true)

    try {
      const file = await createQrCodeImageFile(qrFrameRef.current)

      if (activeScopeIdentity.current !== generationScopeIdentity) {
        return
      }

      generatedQrCodeLink.current = form.getValues('paymentLink').trim()
      form.setValue('paymentQrCodeUrl', '', { shouldDirty: true })
      form.setValue('qrCodeFile', file, {
        shouldDirty: true,
        shouldValidate: true,
      })

      toaster.success({
        title: 'QR Code gerado. Salve para publicar a imagem.',
      })
    } catch (error) {
      toaster.error({
        title: 'Não foi possível gerar o QR Code.',
        description:
          error instanceof Error ? error.message : 'Tente novamente.',
      })
    } finally {
      setGeneratingQrCode(false)
    }
  }

  function onPaymentLinkChange(link: string) {
    form.setValue('paymentLink', link, {
      shouldDirty: true,
      shouldValidate: true,
    })

    const hasGeneratedQrCode =
      Boolean(generatedQrCodeLink.current) &&
      Boolean(form.getValues('qrCodeFile'))
    const generatedFromAnotherLink = generatedQrCodeLink.current !== link.trim()

    if (!hasGeneratedQrCode || !generatedFromAnotherLink) {
      return
    }

    form.setValue('qrCodeFile', null, {
      shouldDirty: true,
      shouldValidate: true,
    })

    generatedQrCodeLink.current = undefined
    toaster.info({ title: 'O link foi alterado. Gere novamente o QR Code.' })
  }

  function onQrCodeFileChange(file: File | null) {
    generatedQrCodeLink.current = undefined
    form.setValue('qrCodeFile', file, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  return {
    qrFrameRef,
    isGeneratingQrCode,
    generateQrCode,
    onPaymentLinkChange,
    onQrCodeFileChange,
  }
}
