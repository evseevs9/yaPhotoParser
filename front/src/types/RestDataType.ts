type itemDataType = {
  id: number
  category: string
  name: string
  nameForSave: string
  description: string
  ingredients: string
  price: number
  picture: string
  measure?: string
  quantity?: number
  nutrients?: {
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
  }
  options?: string
}

type restDataType = Array<itemDataType>

export type { itemDataType, restDataType }
