import { FC, memo } from 'react'
import handleDownload from '../utils/handleDownload'
import type { itemDataType } from '../types/RestDataType'
import { FolderDown, ChevronsRight } from 'lucide-react'

import { motion } from 'framer-motion'
import ImageSize from './ImageSize'

interface RestDataItemProps {
  restDataItem: itemDataType
  addSelectedItem: (item: itemDataType) => void
}

const RestDataItem: FC<RestDataItemProps> = memo(
  ({ restDataItem, addSelectedItem }) => {
    const srcImage = restDataItem?.picture
      ? restDataItem.picture
      : '/img/noPhoto.jpg'

    const itemAnimation = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }

    const itemButtonsAnimation = {
      hidden: { x: 20, opacity: 0 },
      bvisible: { x: 0, opacity: 1 },
    }

    return (
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        whileHover='bvisible'
        transition={{ duration: 0.3 }}
        variants={itemAnimation}
        className='item'
      >
        <a href={srcImage} target='_blank' rel='noopener noreferrer'>
          <img
            src={srcImage}
            alt={restDataItem.name}
            className='item-image'
            loading='lazy'
          />
        </a>
        <div className='description'>
          <h2>{restDataItem.name}</h2>
          <div>Категория: {restDataItem.category}</div>
          <div>Цена: {restDataItem.price} ₽</div>
          <div>
            Вес/Объем:{' '}
            {restDataItem?.quantity && restDataItem?.measure
              ? `${restDataItem?.quantity} ${restDataItem?.measure}`
              : 'не указан'}
          </div>
          <ImageSize url={srcImage} />
        </div>
        <motion.div
          variants={itemButtonsAnimation}
          transition={{ duration: 0.3 }}
          className='item-buttons'
        >
          <button
            onClick={() => addSelectedItem(restDataItem)}
            className='item-button'
          >
            <ChevronsRight size={30} />
          </button>
          <button
            onClick={() =>
              handleDownload(
                srcImage,
                `${restDataItem.nameForSave} ${restDataItem.price}р`
              )
            }
            className='item-button'
          >
            <FolderDown size={30} />
          </button>
        </motion.div>
      </motion.div>
    )
  }
)

export default RestDataItem
