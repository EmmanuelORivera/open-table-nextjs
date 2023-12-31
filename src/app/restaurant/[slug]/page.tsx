import MakeAReservation from '@/app/restaurant/[slug]/components/MakeAReservation'
import RestaurantTabs from './components/RestaurantTabs'
import Title from './components/Title'
import Rating from './components/Rating'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'
import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'
import { RestaurantBySlug } from '@/interfaces/Restaurant'
import CreateReview from './components/CreateReview'

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurantService = PrismaRestaurantService.getInstance()
  const restaurant: RestaurantBySlug =
    await restaurantService.fetchRestaurantBySlug(params.slug)
  return (
    <>
      <div className="px-4 lg:grid lg:grid-cols-[repeat(2,minmax(200px,550px))] lg:gap-10 justify-end">
        <div className="-mt-11 mx-auto max-w-screen-md lg:max-w-screen-md">
          <div className="bg-white mx-auto rounded p-3 shadow text-sm">
            <RestaurantTabs slug={restaurant.slug} />
            <Title title={restaurant.name} />
            <Rating reviews={restaurant.reviews} />
            <Description description={restaurant.description} />
            <MakeAReservation
              openTime={restaurant.open_time}
              closeTime={restaurant.close_time}
              slug={restaurant.slug}
              hideOnLargeScreen
            />
            <Images images={restaurant.images} />
            <CreateReview restaurantId={restaurant.id} />
            <Reviews reviews={restaurant.reviews} />
          </div>
        </div>

        <div>
          <MakeAReservation
            openTime={restaurant.open_time}
            closeTime={restaurant.close_time}
            slug={restaurant.slug}
            className="fixed -mt-11 bg-white rounded"
          />
        </div>
      </div>
    </>
  )
}

export default RestaurantDetails
