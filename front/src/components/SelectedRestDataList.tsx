import { FC } from 'react'
import { restDataType } from '../types/RestDataType'
import SelectedRestDataItem from './SelectedRestDataItem'
import downloadZip from '../utils/downloadZip'

interface SelectedRestDataItemProps {
  selectedRestData: restDataType
  removeSelectedItem: (id: number) => void
  slugName: string
}

const SelectedRestDataList: FC<SelectedRestDataItemProps> = ({
  selectedRestData,
  removeSelectedItem,
  slugName,
}) => {
  return (
    <div>
      {selectedRestData.length > 0 ? (
        <>
          <button onClick={() => downloadZip(selectedRestData, slugName)}>
            Скачать выбранные архивом
          </button>

          {selectedRestData.map((item) => (
            <SelectedRestDataItem
              key={item.id}
              selectedRestDataItem={item}
              removeSelectedItem={removeSelectedItem}
            />
          ))}
        </>
      ) : null}
    </div>
  )
}

export default SelectedRestDataList
