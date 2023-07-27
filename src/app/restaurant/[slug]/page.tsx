import MakeAReservation from '@/app/restaurant/[slug]/components/MakeAReservation'
import RestaurantTabs from './components/RestaurantTabs'
import Title from './components/Title'
import Rating from './components/Rating'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'
import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurantService = PrismaRestaurantService.getInstance()
  const restaurant = await restaurantService.fetchRestaurantBySlug(params.slug)
  return (
    <>
      <div className="px-4 lg:grid lg:grid-cols-[repeat(2,minmax(200px,550px))] lg:gap-10 justify-end">
        <div className="-mt-11 mx-auto max-w-screen-md lg:max-w-screen-md">
          <div className="bg-white mx-auto rounded p-3 shadow text-sm">
            <RestaurantTabs slug={restaurant.slug} />
            <Title title={restaurant.name} />
            <Rating />
            <Description description={restaurant.description} />
            <MakeAReservation hideOnLargeScreen />
            <Images images={restaurant.images} />
            <Reviews reviews={restaurant.reviews} />
          </div>
        </div>

        <div>
          <MakeAReservation className="fixed -mt-11 bg-white rounded" />
        </div>
      </div>
    </>
  )
}

export default RestaurantDetails
