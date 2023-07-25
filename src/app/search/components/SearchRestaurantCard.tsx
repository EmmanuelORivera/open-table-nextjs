import RestaurantPrice from '@/components/RestaurantPrice'
import { Restaurant } from '@/interfaces/Restaurant'
import Link from 'next/link'

const SearchRestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <div className="sm:flex border-b sm:h-[250px] pb-8 mb-8 items-center">
      <img
        src={restaurant.main_image}
        alt=""
        className="w-full h-full sm:min-w-[90px] sm:min-h-[90px] sm:max-w-[205px] sm:max-h-[205px]  object-cover rounded"
      />
      <div className="w-full sm:pl-5">
        <h2 className="text-2xl text-[#247f9e] font-semibold">
          {restaurant.name}
        </h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 font-medium">Awesome</p>
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
