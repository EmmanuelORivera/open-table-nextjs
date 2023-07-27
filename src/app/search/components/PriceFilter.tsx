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
  const prices: { price: Price; label: string; className: string }[] = [
    {
      price: Price.CHEAP,
      label: '$',
      className: 'border w-full text-reg text-center font-light rounded-l p-2',
    },
    {
      price: Price.REGULAR,
      label: '$$',
      className: 'border w-full text-reg text-center font-light p-2',
    },
    {
      price: Price.EXPENSIVE,
      label: '$$$',
      className: 'border w-full text-reg text-center font-light rounded-r p-2',
    },
  ]

  return (
    <div className="mt-3 pb-4">
      <h2 className="mb-2">Price</h2>
      <div className="flex">
        {prices.map(({ price, label, className }) => (
          <Link
            key={label}
            href={{
              pathname: '/search',
              query: { ...searchParams, price },
            }}
            className={className}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PriceFilter
