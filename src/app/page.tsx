import RestaurantCard from '@/components/RestaurantCard'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <div>
      <Hero title="Find your table for any occasion">
        <SearchBar />
      </Hero>
      <div className="py-3 px-36 mt-10 flex flex-wrap ">
        <RestaurantCard />
      </div>
    </div>
  )
}
