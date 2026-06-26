import React, { useState } from 'react'
import { restDataType, itemDataType } from './types/RestDataType'
import SearchForm from './components/SearchForm'

function App() {
  const [restData, setRestData] = useState<restDataType>([])
  console.log(restData)

  return (
    <div className='App'>
      <h1>YaPhotoParser</h1>
      <SearchForm setRestData={setRestData} />
    </div>
  )
}

export default App
