import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { restDataType } from '../types/RestDataType'
import getProcessedImageBlob from './getProcessedImageBlob'

const downloadZip = async (data: restDataType, nameZip: string) => {
  const zip = new JSZip()

  for (const item of data) {
    if (!item.picture) continue
    if (item.picture.endsWith('/img/noPhoto.jpg')) continue

    try {
      const finalBlob = await getProcessedImageBlob(item.picture)

      const baseName = item.nameForSave.replace(/\.[^/.]+$/, '')
      const fileName = `${baseName} - ${item.price}р.jpg`

      zip.file(fileName, finalBlob)
    } catch (err) {
      console.warn(`⚠️ Пропущена картинка ${item.nameForSave}:`, err)
    }
  }

  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, `${nameZip}.zip`)
}

export default downloadZip
