import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import SearchSideBar from './components/SearchSideBar'
import SearchRestaurantCard from './components/SearchRestaurantCard'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Search',
}

const Search = () => {
  return (
    <article className="text-sm">
      <Hero>
        <SearchBar />
      </Hero>
      <div className="sm:flex gap-10 container max-w-7xl mx-auto p-3">
        <SearchSideBar />
        <SearchRestaurantCard />
      </div>
    </article>
  )
}

export default Search
