export async function createQrCodeImageFile(svg: SVGSVGElement): Promise<File> {
  const copy = svg.cloneNode(true)
  if (!(copy instanceof SVGSVGElement)) {
    throw new Error('Não foi possível gerar o QR Code.')
  }

  copy.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  copy.setAttribute('width', '464')
  copy.setAttribute('height', '464')
  copy
    .querySelectorAll('path')
    .forEach((path) => path.setAttribute('fill', '#000000'))

  const source = URL.createObjectURL(
    new Blob([new XMLSerializer().serializeToString(copy)], {
      type: 'image/svg+xml',
    }),
  )

  try {
    const image = new Image()
    image.src = source
    await image.decode()
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Não foi possível criar a imagem do QR Code.')
    }

    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, 512, 512)
    context.drawImage(image, 24, 24, 464, 464)
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((value) => {
        if (value) {
          resolve(value)
        } else {
          reject(new Error('Não foi possível exportar o QR Code.'))
        }
      }, 'image/png'),
    )

    return new File([blob], 'pagamento-qr-code.png', { type: 'image/png' })
  } finally {
    URL.revokeObjectURL(source)
  }
}
