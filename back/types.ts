type itemData = {
  category: string
  name: string
  description: string
  ingredients: string
  price: number
  picture: string
  measure: string
  quantity: number
  nutrients?: {
    calories: string
    proteins: string
    fats: string
    carbohydrates: string
  }
  options?: Array<{ optionName: string; optionPrice: number }>
  optionsName?: string
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
