import RestaurantPrice from '@/components/RestaurantPrice'
import Stars from '@/components/Stars'
import { Restaurant } from '@/interfaces/Restaurant'
import { calculateReviewAvarage, getReviewMessage } from '@/utils/reviewUtils'
import Image from 'next/image'
import Link from 'next/link'

const SearchRestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const reviewAvarage = calculateReviewAvarage(restaurant.reviews)

  return (
    <div className="sm:flex border-b sm:h-[250px] pb-8 mb-8 items-center">
      <Image
        width={300}
        height={300}
        src={restaurant.main_image}
        alt={restaurant.name}
        className="w-full h-full sm:min-w-[90px] sm:min-h-[90px] sm:max-w-[205px] sm:max-h-[205px]  object-cover rounded"
      />
      <div className="w-full sm:pl-5">
        <h2 className="text-2xl text-[#247f9e] font-semibold">
          {restaurant.name}
        </h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className="ml-2 font-medium">{getReviewMessage(reviewAvarage)}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex gap-3">
            <RestaurantPrice price={restaurant.price} />
            <p className="capitalize">{restaurant.cuisine.name}</p>
            <p className="capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchRestaurantCard
