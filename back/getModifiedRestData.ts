// проверить вес, что там купер хочет именно. г или кг или без разницы.
// разобраться с опциями. обязательными-необязательными. их количеством. чтобы привести к нужному виду.

import { restDataType } from './types'
import { originalData } from './types'

const getModifiedRestData = (data: originalData): restDataType => {
  const restData: restDataType = []

  data.payload.categories.forEach((category) => {
    category.items.forEach((item) => {
      restData.push({
        category: category.name,
        name: item.name,
        description: item.description,
        ingredients: item?.descriptions?.find(
          (obj: { title: string; text: string }) => obj.title === 'Состав'
        )?.text,
        price: item.price,
        picture: `https://eda.yandex.ru${item?.picture?.uri.replace(
          '-{w}x{h}',
          ''
        )}`,
        measure: item.measure.measure_unit,
        quantity: item.measure.value,
        nutrients: item?.nutrients_detailed
          ? {
              calories: `${item?.nutrients_detailed?.calories.value} ккал`,
              proteins: `${item?.nutrients_detailed?.proteins.value} г`,
              fats: `${item?.nutrients_detailed?.fats.value} г`,
              carbohydrates: `${item?.nutrients_detailed?.carbohydrates.value} г`,
            }
          : undefined,
      })
    })
  })
  return restData
}

export default getModifiedRestData
