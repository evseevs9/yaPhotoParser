import { FC } from 'react'
import { restDataType } from '../types/RestDataType'
import SelectedRestDataItem from './SelectedRestDataItem'

interface SelectedRestDataItemProps {
  selectedRestData: restDataType
  removeSelectedItem: (id: number) => void
}

const SelectedRestDataList: FC<SelectedRestDataItemProps> = ({
  selectedRestData,
  removeSelectedItem,
}) => {
  return (
    <div>
      {selectedRestData.length > 0
        ? selectedRestData.map((item) => (
            <SelectedRestDataItem
              key={item.id}
              selectedRestDataItem={item}
              removeSelectedItem={removeSelectedItem}
            />
          ))
        : null}
    </div>
  )
}

export default SelectedRestDataList
