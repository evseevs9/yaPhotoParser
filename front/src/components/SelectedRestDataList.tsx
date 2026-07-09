import { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { restDataType } from '../types/RestDataType'
import SelectedRestDataItem from './SelectedRestDataItem'

import downloadZip from '../utils/downloadZip'

interface SelectedRestDataItemProps {
  selectedRestData: restDataType
  removeSelectedItem: (id: number) => void
  slugName: string
  isrestDataLength: boolean
}

const SelectedRestDataList: FC<SelectedRestDataItemProps> = ({
  selectedRestData,
  removeSelectedItem,
  slugName,
  isrestDataLength,
}) => {
  return (
    <div>
      {isrestDataLength ? (
        <>
          <AnimatePresence>
            <motion.div
              className='head-item'
              key='headRestDataList'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h3>Выбранные позиции: </h3>
              <div className='head-select-btn-block'>
                <button
                  disabled={!selectedRestData || selectedRestData.length === 0}
                  onClick={() => downloadZip(selectedRestData, slugName)}
                >
                  Скачать выбранные архивом
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode='popLayout'>
            {selectedRestData.map((item) => (
              <SelectedRestDataItem
                key={item.id}
                selectedRestDataItem={item}
                removeSelectedItem={removeSelectedItem}
              />
            ))}
          </AnimatePresence>
        </>
      ) : null}
    </div>
  )
}

export default SelectedRestDataList
