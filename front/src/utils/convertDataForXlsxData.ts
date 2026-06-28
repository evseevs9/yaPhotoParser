import { DataForXlsxType } from '../types/DataForXlsxType'
import { restDataType } from '../types/RestDataType'

const convertDataForXlsxData = (originData: restDataType): DataForXlsxType => {
  const newData: DataForXlsxType = originData.map((item) => {
    const ingredients: string = item?.ingredients ? item.ingredients : ''
    const description: string = item?.description ? item.description : ''
    let weight: string | number
    let volume: string | number
    if (item?.measure && item?.quantity) {
      if (item.measure === 'g') {
        weight = item.quantity
        volume = ''
      } else {
        weight = ''
        volume = item.quantity
      }
    } else {
      weight = ''
      volume = ''
    }
    const options: string = item?.options ? item.options : ''
    const calories: string | number = item?.nutrients?.calories
      ? item.nutrients.calories
      : ''
    const proteins: string | number = item?.nutrients?.proteins
      ? item.nutrients.proteins
      : ''
    const fats: string | number = item?.nutrients?.fats
      ? item.nutrients.fats
      : ''
    const carbohydrates: string | number = item?.nutrients?.carbohydrates
      ? item.nutrients.carbohydrates
      : ''
    const photo: string = item?.picture ? item.picture : ''
    let exciseTax: string
    if (item?.measure && item?.measure === 'ml') {
      exciseTax = 'Нет'
    } else {
      exciseTax = ''
    }

    return {
      Категория: item.category,
      Название: item.name,
      Состав: ingredients,
      Описание: description,
      Вес: weight,
      Объем: volume,
      Цена: item.price,
      НДС: 'Не облагается',
      Ингредиенты: options,
      Калории: calories,
      Белки: proteins,
      Жиры: fats,
      Углеводы: carbohydrates,
      Фото: photo,
      Акцизность: exciseTax,
    }
  })
  return newData
}

export default convertDataForXlsxData
