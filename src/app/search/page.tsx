import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import SearchSideBar from './components/SearchSideBar'
import SearchRestaurantCard from './components/SearchRestaurantCard'
import { Metadata } from 'next'
import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'
export const metadata: Metadata = {
  title: 'Search',
}

const Search = async ({ searchParams }: { searchParams: { city: string } }) => {
  const restaurantService = PrismaRestaurantService.getInstance()
  const restaurants = await restaurantService.fetchRestaurantsByCity(
    searchParams.city
  )

  return (
    <article>
      <Hero>
        <SearchBar />
      </Hero>
      <div className="mt-10 sm:flex container max-w-screen-xl mx-auto gap-8 justify-center">
        <SearchSideBar />
        <div className="w-full">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <SearchRestaurantCard
                restaurant={restaurant}
                key={restaurant.id}
              />
            ))
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </article>
  )
}

export default Search
