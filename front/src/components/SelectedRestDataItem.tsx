import { FC } from 'react'
import type { itemDataType } from '../types/RestDataType'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

interface SelectedRestDataItemProps {
  selectedRestDataItem: itemDataType
  removeSelectedItem: (id: number) => void
}

const SelectedRestDataItem: FC<SelectedRestDataItemProps> = ({
  selectedRestDataItem,
  removeSelectedItem,
}) => {
  const srcImage = selectedRestDataItem?.picture
    ? selectedRestDataItem.picture
    : '/img/noPhoto.jpg'

  const itemButtonsAnimation = {
    hidden: { x: 20, opacity: 0 },
    bvisible: { x: 0, opacity: 1 },
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className='item'
        whileHover='bvisible'
        initial='hidden'
        key={selectedRestDataItem.id}
        layout
      >
        <a href={srcImage} target='_blank' rel='noopener noreferrer'>
          <img
            src={srcImage}
            alt={selectedRestDataItem.name}
            className='item-image'
            loading='lazy'
          />
        </a>
        <div className='description'>
          <h2>{selectedRestDataItem.name}</h2>
          <div>Категория: {selectedRestDataItem.category}</div>
          <div>Цена: {selectedRestDataItem.price} ₽</div>
          <div>
            Вес/Объем:{' '}
            {selectedRestDataItem?.quantity && selectedRestDataItem?.measure
              ? `${selectedRestDataItem?.quantity} ${selectedRestDataItem?.measure}`
              : 'не указан'}
          </div>
        </div>
        <motion.div
          variants={itemButtonsAnimation}
          transition={{ duration: 0.3 }}
          className='item-buttons'
        >
          <button
            onClick={() => removeSelectedItem(selectedRestDataItem.id)}
            className='item-button'
          >
            <X size={30} />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default SelectedRestDataItem
