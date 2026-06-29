import { FC } from 'react'
import handleDownload from '../utils/handleDownload'
import type { itemDataType } from '../types/RestDataType'
import { RiExpandRightLine } from 'react-icons/ri'
import { FaDownload } from 'react-icons/fa6'

interface RestDataItemProps {
  restDataItem: itemDataType
  addSelectedItem: (item: itemDataType) => void
}

const RestDataItem: FC<RestDataItemProps> = ({
  restDataItem,
  addSelectedItem,
}) => {
  const srcImage = restDataItem?.picture
    ? restDataItem.picture
    : '/img/noPhoto.jpg'

  return (
    <div className='item'>
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
      </div>
      <div className='item-buttons'>
        <button
          onClick={() => addSelectedItem(restDataItem)}
          className='item-button'
        >
          <RiExpandRightLine size={30} />
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
          <FaDownload size={30} />
        </button>
      </div>
    </div>
  )
}

export default RestDataItem
