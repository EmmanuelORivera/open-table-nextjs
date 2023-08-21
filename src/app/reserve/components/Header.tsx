import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'
import { Time, convertToDisplayTime } from '@/utils/convertToDisplayTime'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { ReservePageParams, ReserveSearchParams } from '../[slug]/page'

const Header = async ({
  params,
  searchParams,
}: {
  params: ReservePageParams
  searchParams: ReserveSearchParams
}) => {
  const restaurantService = PrismaRestaurantService.getInstance()
  const restaurant = await restaurantService.fetchRestaurantBySlug(params.slug)

  const [_, time] = searchParams.date.split('T')

  if (!restaurant) notFound()

  const formattedDate = format(new Date(searchParams.date), 'ccc, LLL d')

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
            <p className="mr-6">{formattedDate}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">
              {searchParams.partySize}{' '}
              {parseInt(searchParams.partySize) === 1 ? 'person' : 'people'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
