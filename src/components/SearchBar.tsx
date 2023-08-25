'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from './Button'

interface SearchBarProps {
  placeholder?: string
}
const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'State, city or town',
}) => {
  const router = useRouter()
  const [location, setLocation] = useState('')

  const handleClick = () => {
    if (location === '') return
    const searchCity = `/search?city=${location}`
    router.push(searchCity)
    setLocation('')
  }

  const isButtonDisabled = () => {
    return !location.trim()
  }
  return (
    <div className="flex flex-col gap-4 w-[90%] max-w-3xl sm:flex-row mx-auto">
      <input
        className="rounded p-2 flex-grow"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        type="text"
        placeholder={placeholder}
      />
      <Button
        handleClick={handleClick}
        type="action"
        className="capitalize"
        disabled={isButtonDisabled()}
      >
        Search
      </Button>
    </div>
  )
}

export default SearchBar
