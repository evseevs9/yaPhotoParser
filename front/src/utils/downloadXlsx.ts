import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { restDataType } from '../types/RestDataType'
import { DataForXlsxType } from '../types/DataForXlsxType'
import convertDataForXlsxData from './convertDataForXlsxData'

const downloadXlsx = (originData: restDataType, slugName: string) => {
  const newData: DataForXlsxType = convertDataForXlsxData(originData)
  // Преобразуем массив объектов в рабочий лист
  const worksheet = XLSX.utils.json_to_sheet(newData)
  // Создаем новую книгу
  const workbook = XLSX.utils.book_new()
  // Добавляем лист в книгу
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Данные')

  // Генерируем файл в бинарном формате
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })

  // Создаем Blob и скачиваем
  const blob = new Blob([excelBuffer], {
    type: 'application/octet-stream',
  })
  saveAs(blob, `${slugName}.xlsx`)
}
export default downloadXlsx
