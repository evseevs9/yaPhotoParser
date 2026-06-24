type itemData = {
  category: string
  name: string
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
  // options?: Array<{ optionName: string; optionPrice: number }>
  // optionsName?: string
  options?: string
}

type restDataType = Array<itemData>

type originalData = {
  payload: {
    categories: [
      {
        name: string
        items: any[]
      }
    ]
  }
}

export { restDataType, originalData }
