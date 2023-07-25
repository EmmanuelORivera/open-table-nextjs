import { Price } from '@prisma/client'
import React from 'react'

const priceMapping = {
  [Price.CHEAP]: (
    <div>
      <span>$$</span>
      <span className="text-gray-400">$$</span>
    </div>
  ),
  [Price.REGULAR]: (
    <div>
      <span>$$$</span>
      <span className="text-gray-400">$</span>
    </div>
  ),
  [Price.EXPENSIVE]: <span>$$$$</span>,
}

const RestaurantPrice = ({ price }: { price: Price }) => {
  return priceMapping[price] || <span>Unknown</span>
}

export default RestaurantPrice
