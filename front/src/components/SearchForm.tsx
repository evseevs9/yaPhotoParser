import React, { FC, useState } from 'react'
import { restDataType } from '../types/RestDataType'

interface SearchFormProps {
  setRestData: (value: restDataType) => void
}

const SearchForm: FC<SearchFormProps> = ({ setRestData }) => {
  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const searchSlugForFetch = searchSlugValue
    setSearchSlugValue('')

    fetch(`http://localhost:3000/api/${searchSlugForFetch}`)
      .then((res) => res.json())
      .then((data) => setRestData(data))
  }

  const [searchSlugValue, setSearchSlugValue] = useState<string>('')

  return (
    <form onSubmit={handleSearchFormSubmit}>
      <input
        type='text'
        name='searchSlug'
        value={searchSlugValue}
        onChange={(event) => setSearchSlugValue(event.target.value)}
      />
      <button type='submit'>Искать</button>
    </form>
  )
}

export default SearchForm
