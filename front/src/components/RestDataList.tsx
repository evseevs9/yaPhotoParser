import RestDataItem from './RestDataItem'
import { restDataType, itemDataType } from '../types/RestDataType'
import { FC, useState } from 'react'
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
          <FilterRestDataForm
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
          <p>Псевдо-категория "Выбор пользователей" удалена</p>
          <button onClick={() => downloadZip(restData, slugName)}>
            Скачать все архивом
          </button>
          <button onClick={() => downloadXlsx(restData, slugName)}>
            Скачать .xlsx
          </button>
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
