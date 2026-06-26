// проверить вес, что там купер хочет именно. г или кг или без разницы. +
// разобраться с опциями. обязательными-необязательными. их количеством. чтобы привести к нужному виду.

import { restDataType } from './types'
import { originalData } from './types'

const getModifiedRestData = (data: originalData): restDataType => {
  const restData: restDataType = []

  data.payload.categories.forEach((category) => {
    category.items.forEach((item) => {
      let measure: string | undefined = item?.measure?.measure_unit
      let quantity: number | undefined = item?.measure?.value
      if ((measure === 'kg' || measure === 'l') && quantity) {
        quantity = quantity * 1000
      }
      measure = measure === 'kg' ? 'g' : measure === 'l' ? 'ml' : measure

      let options = ''

      if (item?.optionsGroups) {
        item.optionsGroups.forEach(
          (group: {
            name: string
            maxSelected: number
            minSelected: number
            options: [{ name: string; price: number }]
          }) => {
            const optionsItems = group.options
              .map(
                (optItem: { name: string; price: number }) =>
                  `${optItem.name}=${optItem.price}`
              )
              .join('; ')
            if (options) {
              options = options + ' | '
            }
            options =
              options +
              `${group.name}: ${group.minSelected};${group.maxSelected}: ${optionsItems}`
          }
        )
      }

      restData.push({
        category: category.name,
        name: item.name,
        description: item.description,
        ingredients: item?.descriptions?.find(
          (obj: { title: string; text: string }) => obj.title === 'Состав'
        )?.text,
        price: item.price,
        picture: item?.picture?.uri
          ? `https://eda.yandex.ru${item?.picture?.uri.replace('-{w}x{h}', '')}`
          : undefined,
        measure: measure,
        quantity: quantity,
        nutrients: item?.nutrients_detailed
          ? {
              calories: item?.nutrients_detailed?.calories.value,
              proteins: item?.nutrients_detailed?.proteins.value,
              fats: item?.nutrients_detailed?.fats.value,
              carbohydrates: item?.nutrients_detailed?.carbohydrates.value,
            }
          : undefined,
        options: options,
      })
    })
  })
  return restData
}

export default getModifiedRestData
