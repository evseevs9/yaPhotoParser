import React, { FC, useState } from 'react'
import { restDataType } from '../types/RestDataType'
import extractPlaceSlug from '../utils/extractPlaceSlug'
import { error } from 'console'

interface SearchFormProps {
  setRestData: (value: restDataType) => void
  setSlugName: (value: string) => void
}

const SearchForm: FC<SearchFormProps> = ({ setRestData, setSlugName }) => {
  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const searchSlugForFetch = extractPlaceSlug(searchSlugValue)
    if (searchSlugForFetch) {
      setSlugName(searchSlugForFetch)
    }

    setSearchSlugValue('')

    fetch(`http://localhost:3000/api/${searchSlugForFetch}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok, status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => setRestData(data))
      .catch(() => {
        console.log(`Resource not found for slug: ${searchSlugForFetch}`)
        alert(
          `Не найдено для - ${searchSlugForFetch}, попробуйте снова с корректным slug`
        )
      })
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
