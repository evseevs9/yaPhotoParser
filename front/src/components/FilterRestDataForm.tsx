import { FC, useState } from 'react'

interface FilterRestDataFormProps {
  filterValue: string
  setFilterValue: (value: string) => void
}

const FilterRestDataForm: FC<FilterRestDataFormProps> = ({
  filterValue,
  setFilterValue,
}) => {
  return (
    <div>
      <input
        type='text'
        name='filterRestData'
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        placeholder='фильтр...'
      />
      <button onClick={() => setFilterValue('')}>X</button>
    </div>
  )
}

export default FilterRestDataForm
