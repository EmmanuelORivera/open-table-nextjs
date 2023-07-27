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
  const prices: { price: Price; label: string }[] = [
    {
      price: Price.CHEAP,
      label: '$',
    },
    {
      price: Price.REGULAR,
      label: '$$',
    },
    {
      price: Price.EXPENSIVE,
      label: '$$$',
    },
  ]

  return (
    <div className="mt-3 pb-4">
      <h2 className="mb-2">Price</h2>
      <div className="flex">
        {prices.map(({ price, label }) => (
          <Link
            key={label}
            href={{
              pathname: '/search',
              query: { ...searchParams, price },
            }}
            className="border w-full text-reg font-light rounded-l p-2"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PriceFilter
