import { Restaurant } from '@/interfaces/Restaurant'
import Link from 'next/link'
import React from 'react'
import RestaurantPrice from './RestaurantPrice'
import Stars from './Stars'
import { ReservationManager } from '@/utils/ReservationManager'
import Image from 'next/image'
import { prisma } from '@/services/PrismaSingleton'
import { Review } from '@prisma/client'

const renderReviewText = (reviews: Review[]) => {
  return reviews.length === 1 ? 'review' : 'reviews'
}
const RestaurantCard = async ({ restaurant }: { restaurant: Restaurant }) => {
  const reservationManager = new ReservationManager(restaurant.bookings)
  const todayReservationsCount = reservationManager.todayReservationsCount

  let reviews: Review[] | undefined
  if (restaurant.id) {
    reviews = await prisma.review.findMany({
      where: { restaurant_id: restaurant.id },
    })
  }
  return (
    <div className="pb-3 w-full max-w-[270px] rounded overflow-hidden border cursor-pointer">
      {restaurant.id}
      {JSON.stringify(reviews)}
      <Link href={`/restaurant/${restaurant.slug}`}>
        <Image
          width={1000}
          height={144}
          src={restaurant.main_image}
          alt={restaurant.name}
          className="w-full h-36 object-cover"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            {reviews && <Stars reviews={reviews} />}
            {reviews && (
              <p className="ml-2">
                {reviews.length} {renderReviewText(reviews)}
              </p>
            )}
          </div>
          <div className="flex font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <RestaurantPrice price={restaurant.price} />
            <p className="ml-3">{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">
            Booked {todayReservationsCount} times today
          </p>
        </div>
      </Link>
    </div>
  )
}

export default RestaurantCard
