import React, { useState } from 'react'
import { restDataType, itemDataType } from './types/RestDataType'
import SearchForm from './components/SearchForm'
import RestDataList from './components/RestDataList'
import SelectedRestDataItemList from './components/SelectedRestDataList'
import './components/css/App.css'

function App() {
  const [restData, setRestData] = useState<restDataType>([])
  // console.log(restData)

  const [selectedRestData, setSelectedRestData] = useState<restDataType>([])

  const addSelectedItem = (item: itemDataType): void => {
    setSelectedRestData((prevData) => {
      const isExist = prevData.some(
        (originalItem) => originalItem.id === item.id
      )
      if (!isExist) {
        return [...prevData, item]
      }
      return prevData
    })
  }

  const removeSelectedItem = (id: number) => {
    setSelectedRestData((prevData) => prevData.filter((item) => item.id !== id))
  }

  return (
    <div className='App'>
      <h1>YaPhotoParser</h1>
      <SearchForm setRestData={setRestData} />
      <div className='container'>
        <RestDataList restData={restData} addSelectedItem={addSelectedItem} />
        <SelectedRestDataItemList
          selectedRestData={selectedRestData}
          removeSelectedItem={removeSelectedItem}
        />
      </div>
    </div>
  )
}

export default App
