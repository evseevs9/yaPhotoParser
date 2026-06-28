import { FC } from 'react'
import type { itemDataType } from '../types/RestDataType'
import { MdDeleteForever } from 'react-icons/md'

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
  return (
    <div className='item'>
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
      <div className='item-buttons'>
        <button
          onClick={() => removeSelectedItem(selectedRestDataItem.id)}
          className='item-button'
        >
          <MdDeleteForever size={30} />
        </button>
      </div>
    </div>
  )
}

export default SelectedRestDataItem
