'use client'

import { Price } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'

const getCurrentQueryObject = (
  generatorObject: IterableIterator<[string, string]>
) => {
  let query: Record<string, string> = {}
  let nextResult = generatorObject.next()
  while (!nextResult.done) {
    const [key, value] = nextResult.value
    query = { ...query, [key]: value }

    nextResult = generatorObject.next()
  }
  return query
}

const generateUrlPath = (query: Record<string, string>) => {
  let urlPath = '/search/?'
  const entries = Object.entries(query)

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i]
    urlPath += `${key}=${value}`

    // avoid to add "&" on the last iteration
    if (i !== entries.length - 1) {
      urlPath += '&'
    }
  }

  return urlPath
}

const PriceFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  let query: Record<string, string> = getCurrentQueryObject(
    searchParams.entries()
  )

  const handleClick = (price: Price) => {
    query = { ...query, price }

    router.push(generateUrlPath(query))
  }

  return (
    <div className="mt-3 pb-4">
      <h2 className="mb-2">Price</h2>
      <div className="flex">
        <button
          onClick={() => handleClick(Price.CHEAP)}
          className="border w-full text-reg font-light rounded-l p-2"
        >
          $
        </button>
        <button
          onClick={() => handleClick(Price.REGULAR)}
          className="border-r border-t border-b w-full text-reg font-light p-2"
        >
          $$
        </button>
        <button
          onClick={() => handleClick(Price.EXPENSIVE)}
          className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
        >
          $$$
        </button>
      </div>
    </div>
  )
}

export default PriceFilter
