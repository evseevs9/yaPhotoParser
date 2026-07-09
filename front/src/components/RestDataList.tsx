import RestDataItem from './RestDataItem'
import { restDataType, itemDataType } from '../types/RestDataType'
import { FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import FilterRestDataForm from './FilterRestDataForm'
import downloadZip from '../utils/downloadZip'
import downloadXlsx from '../utils/downloadXlsx'

interface RestDataListProps {
  restData: restDataType
  addSelectedItem: (item: itemDataType) => void
  slugName: string
}

const RestDataList: FC<RestDataListProps> = ({
  restData,
  addSelectedItem,
  slugName,
}) => {
  const [filterValue, setFilterValue] = useState<string>('')

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
                  <button onClick={() => downloadZip(restData, slugName)}>
                    Скачать все архивом
                  </button>
                  <button onClick={() => downloadXlsx(restData, slugName)}>
                    Скачать .xlsx
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
