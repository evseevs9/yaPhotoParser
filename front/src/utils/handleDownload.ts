import getProcessedImageBlob from './getProcessedImageBlob'

const handleDownload = async (srcImage: string, name: string) => {
  if (srcImage.endsWith('/img/noPhoto.jpg')) return
  try {
    const finalBlob = await getProcessedImageBlob(srcImage)

    const url = URL.createObjectURL(finalBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Ошибка скачивания:', error)
  }
}

export default handleDownload
