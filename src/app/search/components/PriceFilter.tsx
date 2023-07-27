import { Price } from '@prisma/client'
import Link from 'next/link'

const PriceFilter = ({
  searchParams,
}: {
  searchParams: {
    city?: string
    cuisine?: string
    price?: string
  }
}) => {
  return (
    <div className="mt-3 pb-4">
      <h2 className="mb-2">Price</h2>
      <div className="flex">
        <Link
          href={{
            pathname: '/search',
            query: { ...searchParams, price: Price.CHEAP },
          }}
          className="border w-full text-reg font-light rounded-l p-2"
        >
          $
        </Link>
        <Link
          href={{
            pathname: '/search',
            query: { ...searchParams, price: Price.REGULAR },
          }}
          className="border-r border-t border-b w-full text-reg font-light p-2"
        >
          $$
        </Link>
        <Link
          href={{
            pathname: '/search',
            query: { ...searchParams, price: Price.EXPENSIVE },
          }}
          className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
        >
          $$$
        </Link>
      </div>
    </div>
  )
}

export default PriceFilter
