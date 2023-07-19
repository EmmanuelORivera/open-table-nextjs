import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import SearchSideBar from './components/SearchSideBar'
import SearchRestaurantCard from './components/SearchRestaurantCard'

const Search = () => {
  return (
    <article className="bg-gray-100 text-sm">
      <div className="max-w-screen-2xl m-auto bg-white">
        <Hero>
          <SearchBar />
        </Hero>
        <div className="sm:flex  gap-10 container max-w-7xl mx-auto p-3">
          <SearchSideBar />
          <SearchRestaurantCard />
        </div>
      </div>
    </article>
  )
}

export default Search
