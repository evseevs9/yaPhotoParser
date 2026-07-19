import React, { FC, useState } from 'react'
import { restDataType } from '../types/RestDataType'
import extractPlaceSlug from '../utils/extractPlaceSlug'

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

    if (searchSlugForFetch !== 'invalidSlug') {
      fetch(`https://yaphotoparser.evseevs9.ru/api/${searchSlugForFetch}`)
        // fetch(`http://localhost:3000/api/${searchSlugForFetch}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `Network response was not ok, status: ${res.status}`
            )
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
  }

  const [searchSlugValue, setSearchSlugValue] = useState<string>('')

  const [isValid, setIsvalid] = useState<boolean>(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value
    setSearchSlugValue(newValue)
    if (
      (newValue.includes('eda.yandex.ru') && newValue.includes('placeSlug=')) ||
      newValue === ''
    ) {
      setIsvalid(true)
    } else {
      setIsvalid(false)
    }
  }

  return (
    <form onSubmit={handleSearchFormSubmit}>
      <input
        placeholder='Ссылка на ресторан'
        type='text'
        name='searchSlug'
        value={searchSlugValue}
        onChange={handleChange}
        style={{
          border: isValid ? '' : '3px solid red',
        }}
      />
      <button
        type='submit'
        disabled={!searchSlugValue || !isValid}
        style={{
          border: isValid ? '' : '3px solid red',
          cursor: isValid ? 'pointer' : 'not-allowed',
        }}
      >
        Искать
      </button>
    </form>
  )
}

export default SearchForm
