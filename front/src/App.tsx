import React, { useState } from 'react'
import { restDataType, itemDataType } from './types/RestDataType'
import SearchForm from './components/SearchForm'
import RestDataList from './components/RestDataList'
import SelectedRestDataItemList from './components/SelectedRestDataList'
import './components/css/allStyles.css'

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

  const [slugName, setSlugName] = useState<string>('')

  return (
    <div className='container'>
      <div className='header'>
        <h1>YaPhotoParser</h1>
        {slugName ? (
          <h3>{slugName}</h3>
        ) : (
          <SearchForm setRestData={setRestData} setSlugName={setSlugName} />
        )}
      </div>
      <div className='columns'>
        <div className='column'>
          <RestDataList
            restData={restData}
            addSelectedItem={addSelectedItem}
            slugName={slugName}
          />
        </div>
        <div className='column'>
          <SelectedRestDataItemList
            selectedRestData={selectedRestData}
            removeSelectedItem={removeSelectedItem}
            slugName={slugName}
          />
        </div>
      </div>
    </div>
  )
}

export default App
