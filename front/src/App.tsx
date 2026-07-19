import React, { useCallback, useState } from 'react'
import { restDataType, itemDataType } from './types/RestDataType'
import SearchForm from './components/SearchForm'
import RestDataList from './components/RestDataList'
import SelectedRestDataItemList from './components/SelectedRestDataList'
import { motion, AnimatePresence } from 'framer-motion'

import '@a1rth/css-normalize'
import './components/css/allStyles.css'
import UpButton from './components/UpButton'
import RefreshButton from './components/RefreshButton'
import ThemeButton from './components/ThemeButton'

function App() {
  const [restData, setRestData] = useState<restDataType>([])

  const [selectedRestData, setSelectedRestData] = useState<restDataType>([])

  const addSelectedItem = useCallback((item: itemDataType): void => {
    setSelectedRestData((prevData) => {
      const isExist = prevData.some(
        (originalItem) => originalItem.id === item.id
      )
      if (!isExist) {
        return [...prevData, item]
      }
      return prevData
    })
  }, [])

  const removeSelectedItem = (id: number) => {
    setSelectedRestData((prevData) => prevData.filter((item) => item.id !== id))
  }

  const [slugName, setSlugName] = useState<string>('')

  const [filterValue, setFilterValue] = useState<string>('')

  return (
    <>
      <RefreshButton
        setRestData={setRestData}
        setSelectedRestData={setSelectedRestData}
        setSlugName={setSlugName}
        slugName={slugName}
        setFilterValue={setFilterValue}
      />
      <ThemeButton />
      <div className='container'>
        <div className='header'>
          <AnimatePresence mode='wait'>
            {slugName ? (
              <motion.h3
                key='slugName'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {slugName}
              </motion.h3>
            ) : (
              <motion.div
                key='searchForm'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <SearchForm
                  setRestData={setRestData}
                  setSlugName={setSlugName}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className='column-main'>
          <RestDataList
            restData={restData}
            addSelectedItem={addSelectedItem}
            slugName={slugName}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        </div>
        <div className='column-selected'>
          <SelectedRestDataItemList
            isrestDataLength={restData.length > 0}
            selectedRestData={selectedRestData}
            removeSelectedItem={removeSelectedItem}
            slugName={slugName}
          />
        </div>
      </div>
      <UpButton />
    </>
  )
}

export default App
