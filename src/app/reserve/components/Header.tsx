import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'
import { notFound } from 'next/navigation'

const Header = async ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { date: string; partySize: string }
}) => {
  console.log(params)
  console.log(searchParams)
  const restaurantService = PrismaRestaurantService.getInstance()
  const restaurant = await restaurantService.fetchRestaurantBySlug(params.slug)

  if (!restaurant) notFound()
  return (
    <div>
      <h3 className="font-bold hidden md:block">You're almost done!</h3>
      <div className="mt-5 flex gap-4">
        <img
          src={restaurant.main_image}
          alt={restaurant.name}
          className="w-32 h-20 rounded hidden md:block object-cover"
        />
        <div className="">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">Tues, 22, 2023</p>
            <p className="mr-6">7:30 PM</p>
            <p className="mr-6">3 people</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
