import RestaurantCard from '@/components/RestaurantCard'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'
import { Restaurant } from '@/interfaces/Restaurant'
import { prisma } from '@/services/PrismaSingleton'

export default async function Home() {
  const restaurantService: PrismaRestaurantService =
    PrismaRestaurantService.getInstance()

  const restaurants: Restaurant[] = await restaurantService.fetchRestaurants()

  const specificRestaurant = await prisma.restaurant.findUnique({
    where: { id: 217 },
    include: { reviews: true },
  })

  console.log(specificRestaurant)

  return (
    <div>
      {JSON.stringify(specificRestaurant?.reviews)}
      <Hero title="Find your table for any occasion">
        <SearchBar />
      </Hero>
      {JSON.stringify(restaurants)}
      <div className="py-3 mt-10 flex flex-wrap justify-center gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </div>
  )
}
