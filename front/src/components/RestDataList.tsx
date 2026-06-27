import RestDataItem from './RestDataItem'
import { restDataType, itemDataType } from '../types/RestDataType'
import { FC, useState } from 'react'
import FilterRestDataForm from './FilterRestDataForm'

interface RestDataListProps {
  restData: restDataType
  addSelectedItem: (item: itemDataType) => void
}

const RestDataList: FC<RestDataListProps> = ({ restData, addSelectedItem }) => {
  const [filterValue, setFilterValue] = useState<string>('')

  return (
    <div>
      <FilterRestDataForm
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      {restData.length > 0
        ? restData
            .filter((item) =>
              item.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((item) => (
              <RestDataItem
                key={item.id}
                restDataItem={item}
                addSelectedItem={addSelectedItem}
              />
            ))
        : null}
    </div>
  )
}

export default RestDataList
