import express, { type Request, type Response } from 'express'
const cors = require('cors')
import headers from './headers'
import getModifiedRestData from './getModifiedRestData'

const app = express()
const PORT: number = 3000

app.use(
  cors({
    origin: 'http://localhost:4000',
  })
)

app.get('/api/:yaSlug', (req: Request, res: Response) => {
  const { yaSlug } = req.params

  fetch(`https://eda.yandex.ru/api/v2/menu/retrieve/${yaSlug}`, {
    headers: headers,
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          res.status(404).json({
            success: false,
            message: 'Resource not found for slug: ' + yaSlug,
          })
        }
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
      console.error('Ошибка:', error, ' slug:', yaSlug)
    })
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
