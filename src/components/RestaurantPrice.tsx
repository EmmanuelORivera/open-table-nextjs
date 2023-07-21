import { Price } from '@prisma/client'
import React from 'react'

const priceMapping = {
  [Price.CHEAP]: (
    <>
      <span>$$</span>
      <span className="text-gray-400">$$</span>
    </>
  ),
  [Price.REGULAR]: (
    <>
      <span>$$$</span>
      <span className="text-gray-400">$</span>
    </>
  ),
  [Price.EXPENSIVE]: <span>$$$$</span>,
}

const RestaurantPrice = ({ price }: { price: Price }) => {
  return priceMapping[price] || <span>Unknown</span>
}

export default RestaurantPrice
