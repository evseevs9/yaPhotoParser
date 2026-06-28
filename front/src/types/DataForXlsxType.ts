type DataForXlsxTypeItem = {
  Категория: string
  Название: string
  Состав: string
  Описание: string
  Вес: number | string
  Объем: number | string
  Цена: number
  НДС: string
  Ингредиенты: string
  Калории: number | string
  Белки: number | string
  Жиры: number | string
  Углеводы: number | string
  Фото: string
  Акцизность: string
}

type DataForXlsxType = Array<DataForXlsxTypeItem>

export type { DataForXlsxType, DataForXlsxTypeItem }
