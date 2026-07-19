const MAX_SIZE = 2000
const MIN_SIZE = 600

const getProcessedImageBlob = async (srcImage: string): Promise<Blob> => {
  const response = await fetch(srcImage)
  if (!response.ok) throw new Error(`Не удалось загрузить ${srcImage}`)
  const blob = await response.blob()

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = URL.createObjectURL(blob)

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = reject
  })

  const w = img.width
  const h = img.height

  const needsResize =
    w < MIN_SIZE || h < MIN_SIZE || w > MAX_SIZE || h > MAX_SIZE

  if (!needsResize) {
    URL.revokeObjectURL(img.src)
    return blob
  }

  let scale = 1
  if (w > MAX_SIZE || h > MAX_SIZE) {
    scale = Math.min(MAX_SIZE / w, MAX_SIZE / h)
  } else if (w < MIN_SIZE || h < MIN_SIZE) {
    scale = Math.max(MIN_SIZE / w, MIN_SIZE / h)
  }

  const newW = Math.round(w * scale)
  const newH = Math.round(h * scale)

  const canvas = document.createElement('canvas')
  canvas.width = newW
  canvas.height = newH
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas не поддерживается')

  ctx.drawImage(img, 0, 0, newW, newH)

  return new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => resolve(b || blob), 'image/jpeg', 0.9)
  })
}

export default getProcessedImageBlob
