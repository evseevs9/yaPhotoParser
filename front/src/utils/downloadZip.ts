import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { restDataType } from '../types/RestDataType'

const downloadZip = async (data: restDataType, nameZip: string) => {
  const zip = new JSZip()

  for (const item of data) {
    if (!item.picture) {
      return
    }
    const response = await fetch(item.picture)
    const blob = await response.blob()

    zip.file(`${item.name} - ${item.price}р.jpg`, blob)
  }

  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, `${nameZip}.zip`)
}

export default downloadZip
