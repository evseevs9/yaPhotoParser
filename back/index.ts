import express, { type Request, type Response } from 'express'
import headers from './headers'
import getModifiedRestData from './getModifiedRestData'

const app = express()
const PORT: number = 3000

app.get('/api/:yaSlug', (req: Request, res: Response) => {
  const { yaSlug } = req.params

  fetch(`https://eda.yandex.ru/api/v2/menu/retrieve/${yaSlug}`, {
    headers: headers,
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.status)
      }
      return response.json()
    })
    .then((data) => {
      const restData = getModifiedRestData(data)
      res.send(restData)
      // res.send(data)
    })
    .catch((error) => {
      console.error('Ошибка:', error)
    })
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
