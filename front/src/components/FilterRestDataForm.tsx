import { FC } from 'react'

interface FilterRestDataFormProps {
  filterValue: string
  setFilterValue: (value: string) => void
}

const FilterRestDataForm: FC<FilterRestDataFormProps> = ({
  filterValue,
  setFilterValue,
}) => {
  return (
    <div style={{ width: '100%', flex: 1 }}>
      <input
        type='text'
        name='filterRestData'
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        placeholder='фильтр...'
      />
      <button onClick={() => setFilterValue('')} className='button-x'>
        X
      </button>
    </div>
  )
}

export default FilterRestDataForm
