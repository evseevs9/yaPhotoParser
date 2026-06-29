import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { restDataType } from '../types/RestDataType'
import { DataForXlsxType } from '../types/DataForXlsxType'
import convertDataForXlsxData from './convertDataForXlsxData'

const downloadXlsx = (originData: restDataType, slugName: string) => {
  const newData: DataForXlsxType = convertDataForXlsxData(originData)
  const worksheet = XLSX.utils.json_to_sheet(newData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Данные')

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })

  const blob = new Blob([excelBuffer], {
    type: 'application/octet-stream',
  })
  saveAs(blob, `${slugName}.xlsx`)
}
export default downloadXlsx
