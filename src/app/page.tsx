import RestaurantCard from '@/components/RestaurantCard'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'
import { Restaurant } from '@/interfaces/Restaurant'

export default async function Home() {
  const restaurantService: PrismaRestaurantService =
    PrismaRestaurantService.getInstance()

  const restaurants: Restaurant[] = await restaurantService.fetchRestaurants()

  return (
    <div>
      <Hero title="Find your table for any occasion">
        <SearchBar />
      </Hero>
      <div className="py-3 mt-10 flex flex-wrap justify-center gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </div>
  )
}
