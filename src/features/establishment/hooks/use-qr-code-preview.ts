import { useEffect, useRef } from 'react'

export function useQrCodePreview(file: File | null | undefined) {
  const imageRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (!file) {
      return
    }

    const previewUrl = URL.createObjectURL(file)
    if (imageRef.current) {
      imageRef.current.src = previewUrl
    }

    return () => URL.revokeObjectURL(previewUrl)
  }, [file])

  return imageRef
}
