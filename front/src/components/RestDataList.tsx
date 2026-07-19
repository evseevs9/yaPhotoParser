import RestDataItem from './RestDataItem'
import { restDataType, itemDataType } from '../types/RestDataType'
import { FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import FilterRestDataForm from './FilterRestDataForm'
import downloadZip from '../utils/downloadZip'
import downloadXlsx from '../utils/downloadXlsx'
import LoadingButton from './LoadingButton'

interface RestDataListProps {
  restData: restDataType
  addSelectedItem: (item: itemDataType) => void
  slugName: string
  filterValue: string
  setFilterValue: (value: string) => void
}

const RestDataList: FC<RestDataListProps> = ({
  restData,
  addSelectedItem,
  slugName,
  filterValue,
  setFilterValue,
}) => {
  const [isAllLoading, setIsAllLoading] = useState(false)
  const [isXLSXLoading, setIsXLSXLoading] = useState(false)

  const handleClicAllkWithLoading = async () => {
    if (isAllLoading) return
    setIsAllLoading(true)
    try {
      await downloadZip(restData, slugName)
    } finally {
      setIsAllLoading(false)
    }
  }

  const handleClickXLSXWithLoading = async () => {
    if (isXLSXLoading) return
    setIsXLSXLoading(true)
    try {
      downloadXlsx(restData, slugName)
    } finally {
      setIsXLSXLoading(false)
    }
  }

  return (
    <div>
      {restData.length > 0 ? (
        <>
          <AnimatePresence>
            <motion.div
              key='headRestDataList'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className='head-item'>
                <div>
                  <h3>Все позиции:</h3>
                  <p>Псевдо-категория "Выбор пользователей" удалена</p>
                </div>
                <div className='head-main-btn-block'>
                  <button onClick={handleClicAllkWithLoading}>
                    {isAllLoading ? <LoadingButton /> : 'Скачать все архивом'}
                  </button>
                  <button onClick={handleClickXLSXWithLoading}>
                    {isXLSXLoading ? <LoadingButton /> : 'Скачать .xlsx'}
                  </button>
                </div>
              </div>
              <div className='head-item filter-item'>
                <FilterRestDataForm
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                />
              </div>
            </motion.div>
          </AnimatePresence>
          {restData
            .filter((item) =>
              item.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((item) => (
              <RestDataItem
                key={item.id}
                restDataItem={item}
                addSelectedItem={addSelectedItem}
              />
            ))}
        </>
      ) : null}
    </div>
  )
}

export default RestDataList
