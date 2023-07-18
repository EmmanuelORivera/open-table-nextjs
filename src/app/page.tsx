import Card from '@/components/Card'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <div className="bg-white container mx-auto">
      <Hero title="Find your table for any occasion">
        <SearchBar />
      </Hero>
      {/* CARDS */}
      <div className="py-3 mt-10 flex flex-wrap justify-center">
        <Card />
      </div>
      {/* CARDS */}
    </div>
  )
}
