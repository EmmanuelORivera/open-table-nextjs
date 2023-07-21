import RestaurantCard from '@/components/RestaurantCard'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import {
  RestaurantService,
  PrismaRestaurantService,
} from '@/services/RestaurantService'
import { Restaurant } from '@/interfaces/Restaurant'

export default async function Home() {
  const restaurantService: RestaurantService = new PrismaRestaurantService()

  const restaurants: Restaurant[] = await restaurantService.fetchRestaurants()

  return (
    <div>
      <Hero title="Find your table for any occasion">
        <SearchBar />
      </Hero>
      <div className="py-3 px-36 mt-10 flex flex-wrap ">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}
