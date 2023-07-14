import Card from '@/components/Card'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className="bg-white container mx-auto">
      <Hero>Find your table for any occasion</Hero>
      {/* CARDS */}
      <div className="py-3 mt-10 flex flex-wrap justify-center">
        <Card />
      </div>
      {/* CARDS */}
    </div>
  )
}
