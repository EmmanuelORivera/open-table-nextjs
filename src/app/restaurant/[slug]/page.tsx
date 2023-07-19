import Hero from '@/components/Hero'
import MakeAReservation from '@/app/restaurant/[slug]/components/MakeAReservation'
import RestaurantTabs from './components/RestaurantTabs'
import Title from './components/Title'
import Rating from './components/Rating'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'

const RestaurantDetails = () => {
  return (
    <article>
      <Hero title="Milestones Grill (Toronto)"></Hero>
      <div className="px-4 lg:grid lg:grid-cols-[repeat(2,minmax(200px,550px))] lg:gap-10 justify-end">
        <div className="-mt-11 mx-auto max-w-screen-md lg:max-w-screen-md">
          <div className="bg-white mx-auto rounded p-3 shadow text-sm">
            <RestaurantTabs />
            <Title title="Milesstone Grill" />
            <Rating />
            <Description />
            <MakeAReservation hideOnLargeScreen />
            <Images />
            <Reviews />
          </div>
        </div>

        <div>
          <MakeAReservation className="fixed -mt-11 bg-white rounded" />
        </div>
      </div>
    </article>
  )
}

export default RestaurantDetails
