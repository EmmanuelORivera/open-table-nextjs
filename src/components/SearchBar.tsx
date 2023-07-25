'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
  return (
    <div className="flex flex-col gap-4 w-[90%] max-w-3xl sm:flex-row mx-auto">
      <input
        className="rounded p-2 flex-grow"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        type="text"
        placeholder={placeholder}
      />
      <button
        onClick={handleClick}
        className="rounded bg-red-600  py-2 text-white sm:w-32 sm:max-w-md"
      >
        Let's go
      </button>
    </div>
  )
}

export default SearchBar
