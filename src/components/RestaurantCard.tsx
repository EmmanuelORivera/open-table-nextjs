import { Restaurant } from '@/interfaces/Restaurant'
import Link from 'next/link'
import React from 'react'
import RestaurantPrice from './RestaurantPrice'

const getReviewInfo = (restaurant: Restaurant) => {
  const numberOfReviews = restaurant.reviews.length
  const reviewText = numberOfReviews === 1 ? 'review' : 'reviews'

  return { numberOfReviews, reviewText }
}
const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const { numberOfReviews, reviewText } = getReviewInfo(restaurant)

  return (
    <div className="pb-3 w-full max-w-[270px] rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img
          src={restaurant.main_image}
          alt=""
          className="w-full h-36 object-cover"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2">
              {numberOfReviews} {reviewText}
            </p>
          </div>
          <div className="flex font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <RestaurantPrice price={restaurant.price} />
            <p className="ml-3">{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  )
}

export default RestaurantCard
